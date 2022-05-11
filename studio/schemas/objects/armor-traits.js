export default {
    name: 'armorTraits',
    title: 'Traits',
    type: 'array',
    of: [
        {
            type: 'string'
        }
    ],
    options: {
        list: [
            { title: '+15% movespeed aura', value: '+15%-movespeed-aura' },
            { title: '+5 arrows per bundle', value: '+5-arrows-per-bundle' },
            { title: '+10 arrows per bundle', value: '+10-arrows-per-bundle' },
            { title: '+15% ranged damage', value: '+15%-ranged-damage' },
            { title: '+30% ranged damage', value: '+30%-ranged-damage' },
            { title: '+15% melee damage', value: '+15%-melee-damage' },
            { title: '+30% melee damage', value: '+30%-melee-damage' },
            {
                title: '+25% melee attack speed',
                value: '+25%-melee-attack-speed'
            },
            {
                title: '30% chance to negate hits',
                value: '30%-chance-to-negate-hits'
            },
            { title: '20% damage reduction', value: '20%-damage-reduction' },
            { title: '35% damage reduction', value: '35%-damage-reduction' },
            {
                title: '100% longer roll cooldown',
                value: '100%-longer-roll-cooldown'
            },
            {
                title: 'Gains speed after dodge',
                value: 'gains-speed-after-dodge'
            },
            {
                title: '+20% weapon damage boost aura',
                value: '+20%-weapon-damage-boost-aura'
            },
            { title: '+50% artifact damage', value: '+50%-artifact-damage' },
            { title: 'Gives you a pet bat', value: 'gives-you-a-pet-bat' },
            {
                title: '-25% artifact cooldown',
                value: '-25%-artifact-cooldown'
            },
            { title: 'Burns nearby enemies', value: 'burns-nearby-enemies' },
            {
                title: '30% chance to negate hits',
                value: '30%-chance-to-negate-hits'
            },
            {
                title: 'Health potions heal nearby allies',
                value: 'health-potions-heal-nearby-allies'
            },
            { title: '+100% souls gathered', value: '+100%-souls-gathered' },
            {
                title: 'Spawns a snowy companion',
                value: 'spawns-a-snowy-companion'
            },
            { title: '3% life steal aura', value: '3%-life-steal-aura' },
            { title: '6% life steal aura', value: '6%-life-steal-aura' },
            {
                title: 'Potion use boosts defense',
                value: 'potion-use-boosts-defense'
            },
            { title: '-40% potion cooldown', value: '-40%-potion-cooldown' },
            { title: 'Mobs target you more', value: 'mobs-target-you-more' }
        ]
    }
}
