import {constants, genericUtils} from '../../../utils.js';

async function early({workflow}) {
    let isUnarmed = constants.unarmedAttacks.includes(genericUtils.getIdentifier(workflow.item));
    let isNatural = workflow.item.system.type.value === 'natural';
    if (!isUnarmed && !isNatural) return;
    let existingBonus = workflow.item.system.magicalBonus ?? 0;
    workflow.item = workflow.item.clone({'system.properties': Array.from(workflow.item.system.properties).concat('mgc'), 'system.magicalBonus': existingBonus + 1}, {keepId: true});
    workflow.item.prepareData();
    workflow.item.prepareFinalAttributes();
    workflow.item.applyActiveEffects();
}
export let insigniaOfClaws = {
    name: 'Insignia of Claws',
    version: '0.12.70',
    midi: {
        actor: [
            {
                pass: 'preambleComplete',
                macro: early,
                priority: 50
            }
        ]
    }
};