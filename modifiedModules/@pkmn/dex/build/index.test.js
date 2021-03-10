"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
describe('Dex', () => {
    describe('Effects', () => {
        test('#getEffect', () => {
            expect(index_1.Dex.getEffect('').exists).toBe(false);
            expect(index_1.Dex.getEffect('foo').exists).toBe(false);
            expect(index_1.Dex.getEffect('move: Thunderbolt').name).toBe('Thunderbolt');
            expect(index_1.Dex.getEffect('move: Foo').exists).toBe(false);
            expect(index_1.Dex.getEffect('ability: Flash Fire').name).toBe('Flash Fire');
            expect(index_1.Dex.getEffect('ability: Foo').exists).toBe(false);
            expect(index_1.Dex.getEffect('item: Choice Band').name).toBe('Choice Band');
            expect(index_1.Dex.getEffect('item: Foo').exists).toBe(false);
            expect(index_1.Dex.getEffect('item: Metronome').name).toBe('Metronome');
            expect(index_1.Dex.getEffect('item: Metronome').effectType).toBe('Item');
            // Falls back to PureEffect
            expect(index_1.Dex.getEffect('Metronome').effectType).toBe('Effect');
        });
    });
    describe('Abilities', () => {
        it('#getAbility', () => {
            expect(index_1.Dex.getAbility('foo').exists).toBe(false);
            expect(index_1.Dex.getAbility('Illuminate').effectType).toBe('Ability');
            expect(index_1.Dex.forGen(6).getAbility('Beast Boost').isNonstandard).toEqual('Future');
            expect(index_1.Dex.forGen(7).getAbility('Beast Boost').isNonstandard).toBeNull();
            expect(index_1.Dex.getAbility('Shield Dust'))
                .toEqual(index_1.Dex.forGen(4).getAbility('Shield Dust'));
            expect(index_1.Dex.forGen(3).getAbility('Lightning Rod'))
                .not.toEqual(index_1.Dex.forGen(4).getAbility('Lightning Rod'));
            expect(index_1.Dex.getAbility('ph').name).toBe('Poison Heal');
            expect(index_1.Dex.getAbility('stag').name).toBe('Shadow Tag');
            expect(index_1.Dex.getAbility('Sturdy').shortDesc) // eslint-disable-next-line
                .toEqual('If this Pokemon is at full HP, it survives one hit with at least 1 HP. Immune to OHKO.');
            expect(index_1.Dex.forGen(3).getAbility('s turdy').shortDesc)
                .toEqual('OHKO moves fail when used against this Pokemon.');
        });
        test('counts', () => {
            const counts = (gen) => {
                const dex = index_1.Dex.forGen(gen);
                let count = 0;
                for (const id in dex.data.Abilities) {
                    const a = dex.getAbility(id);
                    if (!a.exists || a.isNonstandard || a.id === 'noability')
                        continue;
                    count++;
                }
                return count;
            };
            const COUNTS = [0, 0, 76, 47, 41, 27, 42, 27];
            let total = 0;
            for (let gen = 1; gen <= 8; gen++) {
                expect(counts(gen)).toEqual(total += COUNTS[gen - 1]);
            }
        });
        test('#hasAbility', () => {
            expect(index_1.Dex.hasAbility(index_1.Dex.getSpecies('Gengar'), 'Levitate')).toBe(false);
            expect(index_1.Dex.forGen(5).hasAbility(index_1.Dex.forGen(5).getSpecies('Gengar'), 'Levitate')).toBe(true);
        });
        test('cached', () => {
            const a = index_1.Dex.forGen(6).getAbility('Mummy');
            const b = index_1.Dex.forGen(6).getAbility('Mummy');
            const c = index_1.Dex.getAbility('Mummy');
            expect(b).toBe(a);
            expect(c).not.toBe(a);
            expect(b.name).toBe('Mummy');
        });
    });
    describe('Items', () => {
        it('#getItem', () => {
            expect(index_1.Dex.getItem('Aerodactylite').megaEvolves).toEqual('Aerodactyl');
            expect(index_1.Dex.forGen(3).getItem('Berry').isNonstandard).toBe('Past');
            expect(index_1.Dex.forGen(3).getItem('Gold Berry').isNonstandard).toBe('Past');
            expect(index_1.Dex.forGen(3).getItem('Pink Bow').isNonstandard).toBe('Past');
            expect(index_1.Dex.forGen(3).getItem('Polkadot Bow').isNonstandard).toBe('Past');
            expect(index_1.Dex.forGen(2).getItem('berry').name).toBe('Berry');
            expect(index_1.Dex.forGen(2).getItem('berry').isBerry).toBe(true);
            expect(index_1.Dex.forGen(2).getItem('goldberry').name).toBe('Gold Berry');
            expect(index_1.Dex.forGen(2).getItem('goldberry').isBerry).toBe(true);
            expect(index_1.Dex.forGen(2).getItem('Pink Bow').isNonstandard).toBeNull();
            expect(index_1.Dex.forGen(2).getItem('Polkadot Bow').isNonstandard).toBeNull();
            expect(index_1.Dex.getItem('foo').exists).toBe(false);
            expect(index_1.Dex.forGen(2).getItem('Leftovers')).toEqual(index_1.Dex.getItem('Leftovers'));
            expect(index_1.Dex.forGen(3).getItem('Sitrus Berry'))
                .not.toEqual(index_1.Dex.forGen(4).getItem('Sitrus Berry'));
            expect(index_1.Dex.forGen(3).getItem('Red Orb').isNonstandard).toBe('Future');
            expect(index_1.Dex.forGen(6).getItem('Red Orb').gen).toBe(6);
            expect(index_1.Dex.forGen(2).getItem('Old Amber').isNonstandard).toBe('Future');
            expect(index_1.Dex.forGen(5).getItem('Old Amber').gen).toBe(3);
        });
        test('fields', () => {
            expect(index_1.Dex.getItem('Sitrus Berry').effectType).toBe('Item');
            expect(index_1.Dex.forGen(4).getItem('Sitrus Berry').isBerry).toBe(true);
            expect(index_1.Dex.getItem('Heracronite').megaStone).toBe('Heracross-Mega');
            expect(index_1.Dex.getItem('Charizardite-X').megaEvolves).toBe('Charizard');
            expect(index_1.Dex.getItem('Pikanium Z').zMove).toBe('Catastropika');
            expect(index_1.Dex.getItem('Fairium Z').zMove).toBe(true);
            expect(index_1.Dex.getItem('Steelium Z').zMoveType).toBe('Steel');
            expect(index_1.Dex.getItem('Lunalium Z').itemUser).toEqual([
                'Lunala', 'Necrozma-Dawn-Wings',
            ]);
            expect(index_1.Dex.getItem('Meadow Plate').onPlate).toBe('Grass');
            expect(index_1.Dex.getItem('Electric Memory').onMemory).toBe('Electric');
            expect(index_1.Dex.getItem('Douse Drive').onDrive).toBe('Water');
            expect(index_1.Dex.forGen(6).getItem('Electric Gem').isGem).toBe(true);
            expect(index_1.Dex.getItem('Choice Specs').isChoice).toBe(true);
        });
        test('cached', () => {
            const a = index_1.Dex.forGen(6).getItem('Choice Band');
            const b = index_1.Dex.forGen(6).getItem('Choice Band');
            const c = index_1.Dex.getItem('Choice Band');
            expect(b).toBe(a);
            expect(c).not.toBe(a);
            expect(b.name).toBe('Choice Band');
        });
    });
    describe('Moves', () => {
        it('#getMove', () => {
            expect(index_1.Dex.getMove('foo').exists).toBe(false);
            expect(index_1.Dex.forGen(1).getMove('Thunderbolt').exists).toBe(true);
            expect(index_1.Dex.getMove('Draco Meteor').basePower).toEqual(130);
            expect(index_1.Dex.forGen(6).getMove('eq')).toEqual(index_1.Dex.forGen(6).getMove('Earthquake'));
            expect(index_1.Dex.forGen(4).getMove('DracoMeteor').basePower).toEqual(140);
            expect(index_1.Dex.getMove('Crunch').category).toEqual('Physical');
            expect(index_1.Dex.forGen(2).getMove('CRUNCH').category).toEqual('Special');
            expect(index_1.Dex.getMove('Hidden Power [Bug]').name).toEqual('Hidden Power Bug');
        });
        test('fields', () => {
            expect(index_1.Dex.getMove('Tackle').effectType).toBe('Move');
            expect(index_1.Dex.forGen(1).getMove('Surf').basePower).toBe(95);
            expect(index_1.Dex.getMove('Surf').basePower).toBe(90);
            expect(index_1.Dex.forGen(4).getMove('Curse').type).toBe('???');
            expect(index_1.Dex.forGen(5).getMove('Curse').type).toBe('Ghost');
            // FIXME expect(Dex.forGen(1).getMove('Struggle').pp).toBe(10);
            expect(index_1.Dex.forGen(2).getMove('Struggle').pp).toBe(1);
            expect(index_1.Dex.forGen(3).getMove('Bide').accuracy).toBe(100);
            expect(index_1.Dex.forGen(4).getMove('Bide').accuracy).toBe(true);
            expect(index_1.Dex.forGen(3).getMove('Psychic').category).toBe('Special');
            expect(index_1.Dex.getMove('Rock Slide').target).toBe('allAdjacentFoes');
            expect(index_1.Dex.forGen(4).getMove('Psychic').category).toBe('Special');
            expect(index_1.Dex.forGen(5).getMove('Psychic').defensiveCategory).not.toBeDefined();
            expect(index_1.Dex.forGen(5).getMove('Psyshock').defensiveCategory).toBe('Physical');
            expect(index_1.Dex.getMove('Rock Slide').target).toBe('allAdjacentFoes');
            expect(index_1.Dex.getMove('Extreme Speed').priority).toBe(2);
            // FIXME expect(Dex.forGen(1).getMove('Acid Armor').flags).toEqual({});
            expect(index_1.Dex.getMove('Recover').flags.heal).toBe(1);
            expect(index_1.Dex.getMove('Will-O-Wisp').status).toBe('brn');
            expect(index_1.Dex.getMove('Stealth Rock').sideCondition).toBe('stealthrock');
            expect(index_1.Dex.getMove('Confuse Ray').volatileStatus).toBe('confusion');
            expect(index_1.Dex.forGen(1).getMove('Amnesia').boosts).toEqual({ spa: 2, spd: 2 });
            expect(index_1.Dex.forGen(2).getMove('Amnesia').boosts).toEqual({ spd: 2 });
            expect(index_1.Dex.getMove('Karate Chop').critRatio).toBe(2);
            expect(index_1.Dex.getMove('Frost Breath').critRatio).toBe(1);
            expect(index_1.Dex.getMove('Frost Breath').willCrit).toBe(true);
            expect(index_1.Dex.getMove('Bloom Doom').isZ).toBe('grassiumz');
            expect(index_1.Dex.getMove('Acid').isZ).toBeFalsy();
            expect(index_1.Dex.getMove('Acid').zMove.basePower).toBe(100);
            // FIXME expect(Dex.forGen(6).getMove('Acid').zMove).toBeFalsy();
            expect(index_1.Dex.getMove('Hypnosis').zMove.boost).toEqual({ spe: 1 });
            expect(index_1.Dex.getMove('Double Kick').multihit).toBe(2);
            expect(index_1.Dex.getMove('Rock Blast').multihit).toEqual([2, 5]);
            expect(index_1.Dex.getMove('Softboiled').heal).toEqual([1, 2]);
            expect(index_1.Dex.getMove('Hi Jump Kick').hasCrashDamage).toBe(true);
            expect(index_1.Dex.getMove('Struggle').struggleRecoil).toBe(true);
            expect(index_1.Dex.forGen(1).getMove('Double Edge').recoil).toEqual([25, 100]);
            expect(index_1.Dex.getMove('Double Edge').recoil).toEqual([33, 100]);
            expect(index_1.Dex.getMove('Mind Blown').mindBlownRecoil).toBe(true);
            expect(index_1.Dex.getMove('Feint').breaksProtect).toBe(true);
            expect(index_1.Dex.getMove('Sacred Sword').ignoreDefensive).toBe(true);
            expect(index_1.Dex.getMove('Fissure').ohko).toBe(true);
            // self
            expect(index_1.Dex.getMove('Petal Dance').self.volatileStatus).toBe('lockedmove');
            expect(index_1.Dex.getMove('Overheat').self.boosts).toEqual({ spa: -2 });
            // secondaries
            expect(index_1.Dex.getMove('Thunder Fang').secondaries).toHaveLength(2);
            expect(index_1.Dex.forGen(1).getMove('Psychic').secondaries[0].chance).toBe(33);
            expect(index_1.Dex.forGen(2).getMove('Psychic').secondaries[0].chance).toBe(10);
            expect(index_1.Dex.forGen(1).getMove('Psychic').secondaries[0].boosts)
                .toEqual({ spa: -1, spd: -1 });
            expect(index_1.Dex.forGen(2).getMove('Psychic').secondaries[0].boosts)
                .toEqual({ spd: -1 });
            expect(index_1.Dex.getMove('Fire Blast').secondaries[0].status).toBe('brn');
            expect(index_1.Dex.getMove('Hurricane').secondaries[0].volatileStatus)
                .toBe('confusion');
        });
        test('counts', () => {
            const counts = (gen) => {
                const dex = index_1.Dex.forGen(gen);
                let count = 0;
                for (const id in dex.data.Moves) {
                    const m = dex.getMove(id);
                    if (!m.exists || m.isNonstandard)
                        continue;
                    count++;
                }
                return count;
            };
            const COUNTS = [165, 86 + 16, 103, 113, 92, 59, 105 - 14];
            let total = 0;
            for (let gen = 1; gen <= 7; gen++) {
                expect(counts(gen)).toEqual(total += COUNTS[gen - 1]);
            }
            expect(counts(8)).toBe(624 + 41);
        });
        test('cached', () => {
            const a = index_1.Dex.forGen(6).getMove('Earthquake');
            const b = index_1.Dex.forGen(6).getMove('Earthquake');
            const c = index_1.Dex.getMove('Earthquake');
            expect(b).toBe(a);
            expect(c).not.toBe(a);
            expect(b.name).toBe('Earthquake');
        });
    });
    describe('Species', () => {
        test('#getSpecies', () => {
            expect(index_1.Dex.getSpecies('foo').exists).toBe(false);
            // normal
            expect(index_1.Dex.getSpecies('gengar').name).toBe('Gengar');
            expect(index_1.Dex.getSpecies('Gastrodon-East').name).toBe('Gastrodon-East');
            expect(index_1.Dex.getSpecies('sawsbuckwinter').name).toBe('Sawsbuck-Winter');
            // nidoran
            expect(index_1.Dex.getSpecies('nidoran♀').name).toBe('Nidoran-F');
            expect(index_1.Dex.getSpecies('nidoran♂').name).toBe('Nidoran-M');
            // alias
            expect(index_1.Dex.getSpecies('cune').name).toBe('Suicune');
            expect(index_1.Dex.getSpecies('mence').name).toBe('Salamence');
            // mega
            expect(index_1.Dex.getSpecies('Mega Salamence').name).toBe('Salamence-Mega');
            expect(index_1.Dex.getSpecies('M-Alakazam').name).toBe('Alakazam-Mega');
            // primal
            expect(index_1.Dex.getSpecies('Primal Kyogre').name).toBe('Kyogre-Primal');
            expect(index_1.Dex.getSpecies('p groudon').name).toBe('Groudon-Primal');
            // Rockruff-Dusk
            expect(index_1.Dex.getSpecies('Rockruff-Dusk').exists).toBe(true);
            // FIXME expect(Dex.getSpecies('Rockruff-Dusk').name).toBe('Rockruff-Dusk');
        });
        test('counts', () => {
            const counts = (gen) => {
                const dex = index_1.Dex.forGen(gen);
                const count = { species: 0, formes: 0 };
                for (const id in dex.data.Species) {
                    const s = dex.getSpecies(id);
                    if (!s.exists || s.tier === 'Illegal' || s.isNonstandard)
                        continue;
                    if (s.name !== s.baseSpecies) {
                        count.formes++;
                    }
                    else {
                        count.species++;
                    }
                }
                return count;
            };
            let formes = 0;
            expect(counts(1)).toEqual({ species: 151, formes });
            expect(counts(2)).toEqual({ species: 251, formes });
            // Deoxys (3) + Castform (3)
            formes += 3 + 3;
            expect(counts(3)).toEqual({ species: 386, formes });
            // Wormadam (2) + Cherrim (1) + Arceus (16) + Pichu (1) +
            // Rotom (5) + Giratina (1) + Shaymin (1)
            formes += 2 + 1 + 16 + 1 + 5 + 1 + 1;
            expect(counts(4)).toEqual({ species: 493, formes });
            // Basculin (1) + Darmanitan (1) + *-Therian (3) + Keldeo (1) +
            // Kyurem (2) + Meloetta (1) + Genesect (4) - Pichu (1)
            formes += 1 + 1 + 3 + 1 + 2 + 1 + 4 - 1;
            expect(counts(5)).toEqual({ species: 649, formes });
            // Arceus (1) + Vivillon (2) + Meowstic (1) + Primal (2) +
            // Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) + Hoopa (1) +
            // Pikachu (6) + Mega (48) [Floette (1)]
            formes += 1 + 2 + 1 + 2 + 1 + 3 + 3 + 1 + 6 + 48;
            expect(counts(6)).toEqual({ species: 721, formes });
            // Alola (18) + Totem (12) + Pikachu (7) - Pikachu (6) + Greninja (1) + Zygarde (2) +
            // Oricorio (3) + Rockruff (1) + Lycanroc (2) + Wishiwashi (1) + Silvally (17) + Minior (1)
            // Mimikyu (1) + Necrozma (3) [Magearna (1) + LGPE Starters/Meltan/Melmetal (4)]
            formes += 18 + 12 + 7 - 6 + 1 + 2 + 3 + 1 + 2 + 1 + 17 + 1 + 1 + 3 - 1; // FIXME Rockruff
            expect(counts(7)).toEqual({ species: 807, formes });
            // GMax (26) + Silvally (17) + Rotom (5) + Basculin (1) + Meowstic (1) +
            // Aegislash (1) + Pumpkaboo (3) + Gourgeist (3) + Pikachu (7) + Galar (14) +
            // Alola (8) + Indeedee (1) + Morpeko (1) + Eiscue (1) + Zacian/Zamazenta (2) +
            // Toxtricity (1) + Cramorant (2) + Necrozma (2) + Mimikyu (2) + Wishiwashi (1) +
            // Keldeo (1) + Kyruem (2) + Darmanitan (2) + Cherrim (1)
            // {DLC} GMax (7) + Alola (4) + Galar (1) + Pikachu (1) + Magearna (1) + Urshifu (1) +
            // Rockruff (1) + Lycanroc (2) + [Zarude (2)]
            formes = 26 + 17 + 5 + 1 + 1 + 1 + 3 + 3 + 7 + 14 + 8 +
                1 + 1 + 1 + 2 + 1 + 2 + 2 + 2 + 1 + 1 + 2 + 2 + 1 +
                7 + 4 + 1 + 1 + 1 + 1 + 1 + 2 - 1; // FIXME Rockruff
            expect(counts(8)).toEqual({ species: 539, formes });
        });
        test('fields', () => {
            expect(index_1.Dex.getSpecies('Clefable').types).toEqual(['Fairy']);
            expect(index_1.Dex.forGen(3).getSpecies('Clefable').types).toEqual(['Normal']);
            expect(index_1.Dex.getSpecies('Gengar').types[1]).toBe('Poison');
            expect(index_1.Dex.getSpecies('Pikachu').types[1]).not.toBeDefined();
            expect(index_1.Dex.getSpecies('Mew').baseStats)
                .toEqual({ hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100 });
            expect(index_1.Dex.forGen(1).getSpecies('Tauros').baseStats)
                .toEqual({ hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110 });
            expect(index_1.Dex.forGen(6).getSpecies('Pelipper').baseStats.spa).toEqual(85);
            expect(index_1.Dex.getSpecies('Pelipper').baseStats.spa).toEqual(95);
            expect(index_1.Dex.forGen(6).getSpecies('Greninja').abilities)
                .toEqual({ '0': 'Torrent', 'H': 'Protean' });
            expect(index_1.Dex.forGen(7).getSpecies('Greninja').abilities)
                .toEqual({ '0': 'Torrent', 'H': 'Protean', 'S': 'Battle Bond' });
            expect(index_1.Dex.forGen(2).getSpecies('Snorlax').tier).toBe('OU');
            expect(index_1.Dex.forGen(5).getSpecies('Snorlax').tier).toBe('UU');
            expect(index_1.Dex.forGen(3).getSpecies(index_1.Dex.forGen(3).getSpecies('Chansey').prevo).isNonstandard).toBe('Future');
            expect(index_1.Dex.forGen(4).getSpecies('Chansey').prevo).toBe('Happiny');
            expect(index_1.Dex.forGen(2).getSpecies('Chansey').evos).toEqual(['Blissey']);
            expect(index_1.Dex.getSpecies('Charizard-Mega-X').baseSpecies).toBe('Charizard');
            expect(index_1.Dex.getSpecies('Giratina-O').forme).toBe('Origin');
            expect(index_1.Dex.getSpecies('Giratina').baseForme).toBe('Altered');
            expect(index_1.Dex.getSpecies('Shaymin').otherFormes).toEqual(['Shaymin-Sky']);
            expect(index_1.Dex.forGen(7).getSpecies('Charizard').otherFormes)
                .toEqual(['Charizard-Mega-X', 'Charizard-Mega-Y', 'Charizard-Gmax']); // sigh
            expect(index_1.Dex.getSpecies('Gastrodon').cosmeticFormes).toEqual(['Gastrodon-East']);
            expect(index_1.Dex.getSpecies('Garchomp-Mega').isMega).toBe(true);
            expect(index_1.Dex.getSpecies('Yanmega').isMega).not.toBeDefined();
            expect(index_1.Dex.getSpecies('Kyogre-Primal').isPrimal).toBe(true);
        });
        test('#hasAbility', () => {
            expect(index_1.Dex.forGen(7).hasAbility(index_1.Dex.forGen(7).getSpecies('Gengar'), 'Levitate')).toBe(false);
            expect(index_1.Dex.forGen(5).hasAbility(index_1.Dex.forGen(5).getSpecies('Gengar'), 'Levitate')).toBe(true);
        });
        test('cached', () => {
            const a = index_1.Dex.forGen(6).getSpecies('Gengar');
            const b = index_1.Dex.forGen(6).getSpecies('Gengar');
            const c = index_1.Dex.getSpecies('Gengar');
            expect(b).toBe(a);
            expect(c).not.toBe(a);
            expect(b.name).toBe('Gengar');
        });
    });
    describe('Learnsets', () => {
        test('#getLearnset', async () => {
            expect((await index_1.Dex.getLearnset('foo')).exists).toBe(false);
            const learnset = await index_1.Dex.forGen(1).getLearnset('mew');
            expect(learnset.effectType).toBe('Learnset');
            expect(learnset.exists).toBe(true);
            expect(learnset.eventOnly).toBe(true);
            expect(learnset.eventData).toContainEqual({ generation: 1, level: 5, moves: ['pound'] });
            expect(learnset.encounters).not.toBeDefined();
            expect(learnset.learnset.reflect).toEqual(['1M']);
            expect((await index_1.Dex.getLearnset('bulbasaur')).learnset.leafstorm)
                .toEqual(['8M', '7E', '6E', '5E', '4E']);
        });
    });
    describe('Natures', () => {
        test('#getNature', () => {
            const adamant = index_1.Dex.getNature('adamant');
            expect(adamant.exists).toBe(true);
            expect(adamant.name).toBe('Adamant');
            expect(adamant.plus).toBe('atk');
            expect(adamant.minus).toBe('spa');
            const serious = index_1.Dex.forGen(4).getNature('serious');
            expect(serious.exists).toBe(true);
            expect(serious.name).toBe('Serious');
            expect(serious.plus).not.toBeDefined();
            expect(serious.minus).not.toBeDefined();
            expect(index_1.Dex.getNature('foo').exists).toBeFalsy();
        });
        test('count', () => {
            expect(Object.keys(index_1.Dex.data.Natures)).toHaveLength(25);
        });
    });
    describe('Types', () => {
        it('#getType', () => {
            expect(index_1.Dex.getType('Fairy').exists).toBe(true);
            expect(index_1.Dex.forGen(1).getType('steel').exists).toBe(false);
            expect(index_1.Dex.forGen(1).getType('Psychic').damageTaken['Ghost']).toEqual(3);
            expect(index_1.Dex.getType('Psychic').damageTaken['Ghost']).toEqual(1);
            expect(index_1.Dex.getType('Fire').damageTaken['Water']).toEqual(1);
            expect(index_1.Dex.getType('Water').damageTaken['Fire']).toEqual(2);
            expect(index_1.Dex.getType('Ground').damageTaken['Electric']).toEqual(3);
            expect(index_1.Dex.getType('Ice').HPdvs).toEqual({ 'def': 13 });
            expect(index_1.Dex.getType('Flying').HPdvs).toEqual({ 'atk': 12, 'def': 13 });
            expect(index_1.Dex.getType('Dragon').HPivs).toEqual({ 'atk': 30 });
            expect(index_1.Dex.getType('Ground').HPivs).toEqual({ 'spa': 30, 'spd': 30 });
        });
        it('#getImmunity', () => {
            expect(index_1.Dex.getImmunity('Electric', ['Ground'])).toBe(false);
            expect(index_1.Dex.getImmunity({ type: 'Fire' }, 'Fire')).toBe(true);
            expect(index_1.Dex.getImmunity('Ground', ['Ghost', 'Flying'])).toBe(false);
            expect(index_1.Dex.getImmunity('Normal', { getTypes: () => ['Steel', 'Rock'] })).toBe(true);
            expect(index_1.Dex.forGen(1).getImmunity('Ghost', 'Psychic')).toBe(false);
        });
        it('#getEffectiveness', () => {
            expect(index_1.Dex.getEffectiveness('Water', ['Fire'])).toBe(1);
            expect(index_1.Dex.getEffectiveness({ type: 'Fire' }, 'Fire')).toBe(-1);
            expect(index_1.Dex.getEffectiveness('Dark', ['Ghost', 'Psychic'])).toBe(2);
            expect(index_1.Dex.getEffectiveness('Normal', { getTypes: () => ['Steel', 'Rock'] })).toBe(-2);
            expect(index_1.Dex.getEffectiveness('BUug', 'Bug')).toBe(0);
        });
        it('#getHiddenPower', () => {
            const ivs = { hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31 };
            for (let gen = 3; gen <= 7; gen++) {
                const dex = index_1.Dex.forGen(gen);
                for (const type in dex.data.Types) {
                    if (type === 'Normal' || type === 'Fairy')
                        continue;
                    expect(dex.getHiddenPower(Object.assign(Object.assign({}, ivs), dex.getType(type).HPivs)))
                        .toEqual({ power: gen >= 6 ? 60 : 70, type });
                }
            }
            expect(index_1.Dex.forGen(2).getHiddenPower({ hp: 31, atk: 31, def: 27, spe: 31, spa: 31, spd: 31 }))
                .toEqual({ power: 70, type: 'Ice' });
        });
    });
});
describe('Bundle', () => {
    it('usage', async () => {
        {
            const window = {};
            // eslint-disable-next-line no-eval
            eval(fs.readFileSync(path.resolve(__dirname, './build/production.min.js'), 'utf8'));
            expect(window.Dex.forGen(2).getSpecies('kabigon').tier).toBe('OU');
            expect(index_1.Dex.forGen(1).getMove('thunderbolt').exists).toBe(true);
            expect(window.Dex.forGen(1).getType('Psychic').damageTaken['Ghost']).toEqual(3);
            expect((await window.Dex.getLearnset('bulbasaur')).learnset.leafstorm)
                .toEqual(['8M', '7E', '6E', '5E', '4E']);
            expect(window.Dex.forGen(3).getAbility('s turdy').shortDesc)
                .toEqual('OHKO moves fail when used against this Pokemon.');
        }
    });
});
//# sourceMappingURL=index.test.js.map