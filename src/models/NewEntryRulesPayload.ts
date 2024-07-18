import { NewEntry } from "./NewEntry"
import { NewRule } from "./NewRule"

export type NewEntryRulesPayload = {
    entries: NewEntry[],
    rules: NewRule[]
}