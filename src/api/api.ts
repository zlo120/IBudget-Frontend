import { useQuery,useQueryClient, useMutation, UseMutationResult, UseQueryResult, QueryClient } from "@tanstack/react-query";
import { NewEntryRulesPayload } from "../models/NewEntryRulesPayload";
import { useAtomValue } from "jotai";
import { allCsvDataAtom, newEntriesAtom, newRulesAtom } from "../app/routes/app/uploadcsv";
import { Md5 } from "ts-md5";
export const useTagQuery = (): [client: QueryClient, tagQuery: UseQueryResult] => {
    const client = useQueryClient();    
    const tagQuery = useQuery({
        queryKey: ['allTags'],
        queryFn: () => fetch('https://localhost:7163/api/UserDictionary/GetAllTags')
            .then(res => res.json())
            .then((res) => { 
                client.setQueryData(['allTags', 1], res);
                return res;
            }),
    });
    return [ client, tagQuery ];
}
export const useFindUntagged = (): [client: QueryClient, csvMutation: UseMutationResult] => {
    const client = useQueryClient();
    const csvMutation = useMutation({
        mutationFn: async (csvData: any): Promise<Response> => {
            return fetch('https://localhost:7163/api/CSVParser/FindUntagged', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(csvData)
            })},
        onSuccess: (res) => res.json().then(res => client.setQueryData(['untaggedDescriptions', 1], res)),
    });

    return [ client, csvMutation ];
}
export const useSearchAllData = () => {
    return useQuery({
        queryKey: ['searchAllData'],
        queryFn: () => fetch('https://localhost:7163/api/Financial/ReadYear')
            .then(res => res.json()),
    });
}
export const useSearchThisWeekData = () => {    
    const [day, month, year] = new Date().toLocaleDateString('en-GB').split('/');
    return useQuery({
        queryKey: ['thisWeeksSearchData'],
        queryFn: () => fetch(`https://localhost:7163/api/Financial/ReadWeek?date=${month+'%2F'+day+'%2F'+year}`)
            .then(res => res.json()),
    });
}
export const usePostNewRulesAndEntries = (): [client: QueryClient, csvMutation: UseMutationResult] => {
    const client = useQueryClient();
    const csvMutation = useMutation({
        mutationFn: async (csvData: any): Promise<Response> => {
            return fetch('https://localhost:7163/api/CSVParser/CreateNewRulesAndEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(csvData)
            })},
        onSuccess: (res) => res.json().then(res => client.setQueryData(['untaggedDescriptions', 1], res)),
    });

    return [ client, csvMutation ];
}
export const useUploadNewEntryRule = (): [client: QueryClient, csvUploadMutation: UseMutationResult] => {
    const newEntries = useAtomValue(newEntriesAtom);
    const newRules = useAtomValue(newRulesAtom);

    let payload: NewEntryRulesPayload = {entries: [], rules: []};
    for (let i = 0; i < newEntries.length; i++) {
        payload.entries.push(newEntries[i]);
    }
    for (let i = 0; i < newRules.length; i++) {
        payload.rules.push(newRules[i]);
    }

    const client = useQueryClient();
    const csvUploadMutation = useMutation({
        mutationFn: async (event: any): Promise<Response> => {
            return fetch('https://localhost:7163/api/CSVParser/BatchCreateNewEntriesAndRules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })},
        onSuccess: (res) => res.json().then(res => client.setQueryData(['newEntryRulesRes', 1], res)),
    });

    return [ client, csvUploadMutation ];
}
export const useUploadCsvData = (): [client: QueryClient, csvUploadMutation: UseMutationResult] => {
    const allCsvData = useAtomValue(allCsvDataAtom);
    const client = useQueryClient();
    const csvUploadMutation = useMutation({
        mutationFn: async (event: any): Promise<Response> => {
            return fetch('https://localhost:7163/api/CSVParser/ParseCSV', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        csvBatch: allCsvData,
                        batchHash: Md5.hashStr(JSON.stringify(allCsvData))
                    }
                )
            })},
        onSuccess: (res) => res.json().then(res => client.setQueryData(['csvUploadRes', 1], res)),
    });

    return [ client, csvUploadMutation ];
}