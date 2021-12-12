import { getRepository } from "typeorm";
import { Hook } from "../models/Hook";

export default function linkHooksToSampleLetter(hooks: Hook[], sLetterId: number, insertIntoHookSampleLetterTable: Function) {
    
    const hookRepository = getRepository(Hook)

    hooks.forEach(async (hook: Hook) => {

        let dbHook = await hookRepository.findOne({ 'where': { 'value': hook.value } })

        if (!dbHook) {

            dbHook = await hookRepository.create(hook).save()

        }

        await insertIntoHookSampleLetterTable(sLetterId, dbHook.id);
    })
}