import {dialogUtils, genericUtils, itemUtils, rollUtils, workflowUtils} from '../../../../utils.js';

async function damage({workflow}) {
    if (!workflow.hitTargets.size) return;
    if (genericUtils.getIdentifier(workflow.item) !== 'unarmedStrike') return;
    let featureItem = itemUtils.getItemByIdentifier(workflow.actor, 'draconicStrike');
    if (!featureItem) return;
    let buttons = [
        ['DND5E.DamageAcid', 'acid', {image: 'icons/magic/acid/projectile-faceted-glob.webp'}],
        ['DND5E.DamageCold', 'cold', {image: 'icons/magic/air/wind-tornado-wall-blue.webp'}],
        ['DND5E.DamageFire', 'fire', {image: 'icons/magic/fire/beam-jet-stream-embers.webp'}],
        ['DND5E.DamageLightning', 'lightning', {image: 'icons/magic/lightning/bolt-blue.webp'}],
        ['DND5E.DamagePoison', 'poison', {image: 'icons/magic/death/skull-poison-green.webp'}],
        ['CHRISPREMADES.Generic.No', false, {image: 'icons/svg/cancel.svg'}]
    ];
    let selection = await dialogUtils.buttonDialog(featureItem.name, 'CHRISPREMADES.Macros.DraconicStrike.Select', buttons);
    if (!selection) return;
    workflow.damageRolls = await Promise.all(workflow.damageRolls.map(async i => await rollUtils.getChangedDamageRoll(i, selection)));
    await workflow.setDamageRolls(workflow.damageRolls);
}
export let draconicStrike = {
    name: 'Draconic Strike',
    version: '0.12.49',
    midi: {
        actor: [
            {
                pass: 'damageRollComplete',
                macro: damage,
                priority: 50
            }
        ]
    }
};