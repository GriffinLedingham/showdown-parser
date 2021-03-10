import * as T from '@pkmn/dex-types';
export declare function toID(text: any): T.ID;
export interface FormatsData {
    tier?: string;
    doublesTier?: string;
    isNonstandard?: T.Nonstandard;
    inherit?: boolean;
}
interface AnyObject {
    [k: string]: any;
}
export declare class BasicEffect<NameT extends string = string> implements T.BasicEffect<NameT> {
    id: T.ID;
    name: NameT;
    fullname: string;
    effectType: T.EffectType;
    kind: T.DataKind;
    exists: boolean;
    num: number;
    gen: T.GenerationNum;
    shortDesc: string;
    desc: string;
    isNonstandard: T.Nonstandard | null;
    duration?: number;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
    toString(): NameT;
}
export declare class PureEffect extends BasicEffect implements T.PureEffect {
    readonly effectType: 'Effect' | 'Weather' | 'Status';
    readonly kind: 'Effect';
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
}
export declare class Ability extends BasicEffect<T.AbilityName> implements T.Ability {
    readonly effectType: 'Ability';
    readonly kind: 'Ability';
    readonly isUnbreakable?: boolean;
    readonly suppressWeather?: boolean;
    readonly effect?: Partial<PureEffect>;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
}
export declare class Item extends BasicEffect<T.ItemName> implements T.Item {
    readonly effectType: 'Item';
    readonly kind: 'Item';
    readonly forcedForme?: T.SpeciesName;
    readonly megaStone?: T.SpeciesName;
    readonly megaEvolves?: T.SpeciesName;
    readonly onDrive?: T.TypeName;
    readonly onMemory?: T.TypeName;
    readonly onPlate?: T.TypeName;
    readonly zMove?: T.MoveName | true;
    readonly zMoveType?: T.TypeName;
    readonly zMoveFrom?: T.MoveName;
    readonly itemUser?: T.SpeciesName[];
    readonly fling?: T.ItemData['fling'];
    readonly effect?: Partial<PureEffect>;
    readonly ignoreKlutz?: boolean;
    readonly isBerry?: boolean;
    readonly isChoice?: boolean;
    readonly isGem?: boolean;
    readonly isPokeball?: boolean;
    readonly naturalGift?: {
        basePower: number;
        type: T.TypeName;
    };
    readonly boosts?: Partial<T.BoostsTable> | false;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
}
export declare class Move extends BasicEffect<T.MoveName> implements T.Move {
    readonly effectType: 'Move';
    readonly kind: 'Move';
    readonly boosts?: Partial<T.BoostsTable>;
    readonly status?: T.StatusName;
    readonly volatileStatus?: T.ID;
    readonly slotCondition?: T.ID;
    readonly sideCondition?: T.ID;
    readonly terrain?: T.ID;
    readonly pseudoWeather?: T.ID;
    readonly weather?: T.ID;
    readonly basePower: number;
    readonly type: T.TypeName;
    readonly accuracy: true | number;
    readonly pp: number;
    readonly target: T.MoveTarget;
    readonly priority: number;
    readonly flags: T.Move['flags'];
    readonly category: T.MoveCategory;
    readonly effect?: Partial<T.PureEffectData>;
    readonly damage?: number | 'level' | false | null;
    readonly noPPBoosts?: boolean;
    readonly isZ: boolean | T.ID;
    readonly zMove?: {
        basePower?: number;
        effect?: T.ID;
        boost?: Partial<T.BoostsTable>;
    };
    readonly isMax: boolean | T.SpeciesName;
    readonly maxMove?: {
        basePower: number;
    };
    readonly ohko?: boolean | T.TypeName;
    readonly thawsTarget?: boolean;
    readonly heal?: number[] | null;
    readonly forceSwitch?: boolean;
    readonly selfSwitch?: boolean | 'copyvolatile';
    readonly selfBoost?: {
        boosts?: Partial<T.BoostsTable>;
    };
    readonly selfdestruct?: boolean | 'ifHit' | 'always';
    readonly breaksProtect?: boolean;
    readonly recoil?: [number, number];
    readonly drain?: [number, number];
    readonly mindBlownRecoil?: boolean;
    readonly struggleRecoil?: boolean;
    readonly stealsBoosts?: boolean;
    readonly secondary?: T.SecondaryEffect | null;
    readonly secondaries: T.SecondaryEffect[] | null;
    readonly self?: T.HitEffect | null;
    readonly alwaysHit?: boolean;
    readonly basePowerModifier?: number;
    readonly critModifier?: number;
    readonly critRatio?: number;
    readonly defensiveCategory?: T.MoveCategory;
    readonly forceSTAB?: boolean;
    readonly ignoreAbility?: boolean;
    readonly ignoreAccuracy?: boolean;
    readonly ignoreDefensive?: boolean;
    readonly ignoreEvasion?: boolean;
    readonly ignoreImmunity?: boolean | {
        [k in keyof T.TypeName]?: boolean;
    };
    readonly ignoreNegativeOffensive?: boolean;
    readonly ignoreOffensive?: boolean;
    readonly ignorePositiveDefensive?: boolean;
    readonly ignorePositiveEvasion?: boolean;
    readonly infiltrates?: boolean;
    readonly multiaccuracy?: boolean;
    readonly multihit?: number | number[];
    readonly noCopy?: boolean;
    readonly noDamageVariance?: boolean;
    readonly noFaint?: boolean;
    readonly nonGhostTarget?: T.MoveTarget;
    readonly pressureTarget?: T.MoveTarget;
    readonly sleepUsable?: boolean;
    readonly smartTarget?: boolean;
    readonly spreadModifier?: number;
    readonly tracksTarget?: boolean;
    readonly useSourceDefensiveAsOffensive?: boolean;
    readonly useTargetOffensive?: boolean;
    readonly willCrit?: boolean;
    readonly hasCrashDamage?: boolean;
    readonly isConfusionSelfHit?: boolean;
    readonly isFutureMove?: boolean;
    readonly noMetronome?: T.MoveName[];
    readonly noSketch?: boolean;
    readonly stallingMove?: boolean;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
}
export declare class Species extends BasicEffect<T.SpeciesName> implements T.Species {
    readonly effectType: 'Pokemon';
    readonly kind: 'Species';
    readonly baseStats: T.StatsTable;
    readonly baseSpecies: T.SpeciesName;
    readonly baseForme: T.FormeName | '';
    readonly forme: T.FormeName | '';
    readonly abilities: T.SpeciesAbility<T.AbilityName | ''>;
    readonly types: T.TypeName[];
    readonly prevo?: T.SpeciesName | '';
    readonly evos?: T.SpeciesName[];
    readonly nfe: boolean;
    readonly eggGroups: T.EggGroup[];
    readonly weightkg: number;
    readonly weighthg: number;
    readonly heightm: number;
    readonly unreleasedHidden: boolean | 'Past';
    readonly maleOnlyHidden: boolean;
    readonly changesFrom?: T.SpeciesName;
    readonly tier: string;
    readonly doublesTier: string;
    readonly evoMove?: T.MoveName;
    readonly cosmeticFormes?: T.SpeciesName[];
    readonly otherFormes?: T.SpeciesName[];
    readonly genderRatio: {
        M: number;
        F: number;
    };
    readonly isMega?: boolean;
    readonly isPrimal?: boolean;
    readonly battleOnly?: T.SpeciesName | T.SpeciesName[];
    readonly isGigantamax?: T.MoveName;
    readonly requiredAbility?: T.AbilityName;
    readonly requiredItem?: T.ItemName;
    readonly requiredItems?: T.ItemName[];
    readonly requiredMove?: T.MoveName;
    readonly gender?: T.GenderName;
    readonly maxHP?: number;
    readonly evoLevel?: number;
    readonly evoCondition?: string;
    readonly evoItem?: string;
    readonly evoType?: T.EvoType;
    readonly effect?: Partial<PureEffect>;
    readonly canHatch?: boolean;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
}
export declare class Learnset implements T.Learnset {
    readonly effectType: 'Learnset';
    readonly kind: 'Learnset';
    readonly learnset?: {
        [moveid: string]: T.MoveSource[];
    };
    readonly eventOnly: boolean;
    readonly eventData?: T.EventInfo[];
    readonly encounters?: T.EventInfo[];
    readonly exists: boolean;
    constructor(data: AnyObject);
}
export declare class Type implements T.Type {
    readonly id: T.ID;
    readonly name: T.TypeName;
    readonly effectType: 'Type';
    readonly kind: 'Type';
    readonly exists: boolean;
    readonly gen: T.GenerationNum;
    readonly damageTaken: {
        [t in Exclude<T.TypeName, '???'>]: number;
    } & {
        [key: string]: number;
    };
    readonly HPivs: Partial<T.StatsTable>;
    readonly HPdvs: Partial<T.StatsTable>;
    constructor(data: AnyObject, ...moreData: (AnyObject | null)[]);
    toString(): T.TypeName;
}
export interface Nature extends T.Nature {
    cached?: boolean;
}
declare const GEN_IDS: readonly ["gen1", "gen2", "gen3", "gen4", "gen5", "gen6", "gen7", "gen8"];
declare type GenID = typeof GEN_IDS[number];
export declare class ModdedDex implements T.Dex {
    static readonly STATS: ReadonlyArray<T.StatName>;
    readonly gen: T.GenerationNum;
    readonly genid: GenID;
    readonly data: {
        Abilities: {
            [id: string]: T.AbilityData;
        };
        Aliases: {
            [id: string]: string;
        };
        Items: {
            [id: string]: T.ItemData;
        };
        Moves: {
            [id: string]: T.MoveData;
        };
        Species: {
            [id: string]: T.SpeciesData;
        };
        Natures: {
            [id: string]: T.NatureData;
        };
        Learnsets: null | {
            [id: string]: T.LearnsetData;
        };
        Types: {
            [type in Exclude<T.TypeName, '???'>]: T.TypeData;
        };
        FormatsData: {
            [id: string]: FormatsData;
        };
    };
    private readonly cache;
    constructor(genid?: T.GenID);
    get modid(): T.ID;
    mod(genid: GenID): ModdedDex;
    forGen(gen: number): ModdedDex;
    getSpecies(name: string | Species): Species;
    hasAbility(species: Species, ability: string): boolean;
    getLearnset(name: string): Promise<Learnset>;
    getEffect(name?: string | T.Effect | null): T.Effect;
    getPureEffectByID(id: T.ID): PureEffect;
    getAbility(name: string | Ability): Ability;
    getItem(name: string | Item): Item;
    getMove(name: string | Move): Move;
    getNature(name: string | Nature): Nature;
    getType(name: string | Type): Type;
    getImmunity(source: {
        type: string;
    } | string, target: {
        getTypes: () => string[];
    } | {
        types: string[];
    } | string[] | string): boolean;
    getEffectiveness(source: {
        type: string;
    } | string, target: {
        getTypes: () => string[];
    } | {
        types: string[];
    } | string[] | string): number;
    getHiddenPower(ivs: T.StatsTable): {
        type: T.TypeName;
        power: number;
    };
    loadData(): {
        Abilities: {
            [id: string]: T.AbilityData;
        };
        Aliases: {
            [id: string]: string;
        };
        Items: {
            [id: string]: T.ItemData;
        };
        Moves: {
            [id: string]: T.MoveData;
        };
        Species: {
            [id: string]: T.SpeciesData;
        };
        Natures: {
            [id: string]: T.NatureData;
        };
        Learnsets: {
            [id: string]: T.LearnsetData;
        } | null;
        Types: {
            Normal: T.TypeData;
            Fighting: T.TypeData;
            Flying: T.TypeData;
            Poison: T.TypeData;
            Ground: T.TypeData;
            Rock: T.TypeData;
            Bug: T.TypeData;
            Ghost: T.TypeData;
            Steel: T.TypeData;
            Fire: T.TypeData;
            Water: T.TypeData;
            Grass: T.TypeData;
            Electric: T.TypeData;
            Psychic: T.TypeData;
            Ice: T.TypeData;
            Dragon: T.TypeData;
            Dark: T.TypeData;
            Fairy: T.TypeData;
        };
        FormatsData: {
            [id: string]: FormatsData;
        };
    };
    includeModData(): this;
    includeData(): this;
    includeFormats(): this;
    load(type: Exclude<keyof ModdedDex['data'], 'Natures' | 'Aliases'>): void;
}
export declare const Dex: ModdedDex;
export { ID, As, Weather, FieldCondition, SideCondition, GenerationNum, GenderName, StatName, StatsTable, BoostName, BoostsTable, MoveCategory, MoveTarget, Nonstandard, EvoType, EggGroup, SideID, Player, GameType, HPColor, StatusName, NatureName, TypeName, HPTypeName, PokemonSet, AbilityName, ItemName, MoveName, SpeciesName, FormeName, EffectType, DataKind, Effect, EffectData, HitEffect, SecondaryEffect, PureEffectData, AbilityData, ItemData, MoveData, SpeciesData, MoveSource, EventInfoData, LearnsetData, TypeData, NatureData, EventInfo, GenID, } from '@pkmn/dex-types';
