import { useQuery,useQueryClient, useMutation, UseMutationResult, UseQueryResult, QueryClient } from "@tanstack/react-query";
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
        queryFn: () => fetch('https://localhost:7163/api/Financial/ReadWeek?date=04%2F02%2F2024')
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