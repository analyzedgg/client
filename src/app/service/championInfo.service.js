'use strict';

angular.module('leagueApp.service')
    .service('ChampionInfoService', championInfoService);

function championInfoService() {
    var championData = {
                          "data": {
                             "Aatrox": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 266,
                                "title": "the Darkin Blade",
                                "name": "Aatrox",
                                "key": "Aatrox"
                             },
                             "Thresh": {
                                "tags": [
                                   "Support",
                                   "Fighter"
                                ],
                                "id": 412,
                                "title": "the Chain Warden",
                                "name": "Thresh",
                                "key": "Thresh"
                             },
                             "Tryndamere": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 23,
                                "title": "the Barbarian King",
                                "name": "Tryndamere",
                                "key": "Tryndamere"
                             },
                             "Gragas": {
                                "tags": [
                                   "Fighter",
                                   "Mage"
                                ],
                                "id": 79,
                                "title": "the Rabble Rouser",
                                "name": "Gragas",
                                "key": "Gragas"
                             },
                             "AurelionSol": {
                                "tags": [
                                   "Mage",
                                   "Figher"
                                ],
                                "id": 136,
                                "title": "The Star Forger",
                                "name": "Aurelion Sol",
                                "key": "AurelionSol"
                             },
                             "Cassiopeia": {
                                "tags": ["Mage"],
                                "id": 69,
                                "title": "the Serpent's Embrace",
                                "name": "Cassiopeia",
                                "key": "Cassiopeia"
                             },
                             "Poppy": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 78,
                                "title": "Keeper of the Hammer",
                                "name": "Poppy",
                                "key": "Poppy"
                             },
                             "Ryze": {
                                "tags": [
                                   "Mage",
                                   "Fighter"
                                ],
                                "id": 13,
                                "title": "the Rogue Mage",
                                "name": "Ryze",
                                "key": "Ryze"
                             },
                             "Sion": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 14,
                                "title": "The Undead Juggernaut",
                                "name": "Sion",
                                "key": "Sion"
                             },
                             "Annie": {
                                "tags": ["Mage"],
                                "id": 1,
                                "title": "the Dark Child",
                                "name": "Annie",
                                "key": "Annie"
                             },
                             "Jhin": {
                                "tags": [
                                   "Marksman",
                                   "Assassin"
                                ],
                                "id": 202,
                                "title": "the Virtuoso",
                                "name": "Jhin",
                                "key": "Jhin"
                             },
                             "Nautilus": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 111,
                                "title": "the Titan of the Depths",
                                "name": "Nautilus",
                                "key": "Nautilus"
                             },
                             "Karma": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 43,
                                "title": "the Enlightened One",
                                "name": "Karma",
                                "key": "Karma"
                             },
                             "Lux": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 99,
                                "title": "the Lady of Luminosity",
                                "name": "Lux",
                                "key": "Lux"
                             },
                             "Ahri": {
                                "tags": [
                                   "Mage",
                                   "Assassin"
                                ],
                                "id": 103,
                                "title": "the Nine-Tailed Fox",
                                "name": "Ahri",
                                "key": "Ahri"
                             },
                             "Olaf": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 2,
                                "title": "the Berserker",
                                "name": "Olaf",
                                "key": "Olaf"
                             },
                             "Viktor": {
                                "tags": ["Mage"],
                                "id": 112,
                                "title": "the Machine Herald",
                                "name": "Viktor",
                                "key": "Viktor"
                             },
                             "Singed": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 27,
                                "title": "the Mad Chemist",
                                "name": "Singed",
                                "key": "Singed"
                             },
                             "Garen": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 86,
                                "title": "The Might of Demacia",
                                "name": "Garen",
                                "key": "Garen"
                             },
                             "Anivia": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 34,
                                "title": "the Cryophoenix",
                                "name": "Anivia",
                                "key": "Anivia"
                             },
                             "Maokai": {
                                "tags": [
                                   "Tank",
                                   "Mage"
                                ],
                                "id": 57,
                                "title": "the Twisted Treant",
                                "name": "Maokai",
                                "key": "Maokai"
                             },
                             "Lissandra": {
                                "tags": ["Mage"],
                                "id": 127,
                                "title": "the Ice Witch",
                                "name": "Lissandra",
                                "key": "Lissandra"
                             },
                             "Morgana": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 25,
                                "title": "Fallen Angel",
                                "name": "Morgana",
                                "key": "Morgana"
                             },
                             "Evelynn": {
                                "tags": [
                                   "Assassin",
                                   "Mage"
                                ],
                                "id": 28,
                                "title": "the Widowmaker",
                                "name": "Evelynn",
                                "key": "Evelynn"
                             },
                             "Fizz": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 105,
                                "title": "the Tidal Trickster",
                                "name": "Fizz",
                                "key": "Fizz"
                             },
                             "Heimerdinger": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 74,
                                "title": "the Revered Inventor",
                                "name": "Heimerdinger",
                                "key": "Heimerdinger"
                             },
                             "Zed": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 238,
                                "title": "the Master of Shadows",
                                "name": "Zed",
                                "key": "Zed"
                             },
                             "Rumble": {
                                "tags": [
                                   "Fighter",
                                   "Mage"
                                ],
                                "id": 68,
                                "title": "the Mechanized Menace",
                                "name": "Rumble",
                                "key": "Rumble"
                             },
                             "Mordekaiser": {
                                "tags": ["Fighter"],
                                "id": 82,
                                "title": "the Iron Revenant",
                                "name": "Mordekaiser",
                                "key": "Mordekaiser"
                             },
                             "Sona": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 37,
                                "title": "Maven of the Strings",
                                "name": "Sona",
                                "key": "Sona"
                             },
                             "Katarina": {
                                "tags": [
                                   "Assassin",
                                   "Mage"
                                ],
                                "id": 55,
                                "title": "the Sinister Blade",
                                "name": "Katarina",
                                "key": "Katarina"
                             },
                             "KogMaw": {
                                "tags": [
                                   "Marksman",
                                   "Mage"
                                ],
                                "id": 96,
                                "title": "the Mouth of the Abyss",
                                "name": "Kog'Maw",
                                "key": "KogMaw"
                             },
                             "Ashe": {
                                "tags": [
                                   "Marksman",
                                   "Support"
                                ],
                                "id": 22,
                                "title": "the Frost Archer",
                                "name": "Ashe",
                                "key": "Ashe"
                             },
                             "Lulu": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 117,
                                "title": "the Fae Sorceress",
                                "name": "Lulu",
                                "key": "Lulu"
                             },
                             "Karthus": {
                                "tags": ["Mage"],
                                "id": 30,
                                "title": "the Deathsinger",
                                "name": "Karthus",
                                "key": "Karthus"
                             },
                             "Alistar": {
                                "tags": [
                                   "Tank",
                                   "Support"
                                ],
                                "id": 12,
                                "title": "the Minotaur",
                                "name": "Alistar",
                                "key": "Alistar"
                             },
                             "Darius": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 122,
                                "title": "the Hand of Noxus",
                                "name": "Darius",
                                "key": "Darius"
                             },
                             "Vayne": {
                                "tags": [
                                   "Marksman",
                                   "Assassin"
                                ],
                                "id": 67,
                                "title": "the Night Hunter",
                                "name": "Vayne",
                                "key": "Vayne"
                             },
                             "Udyr": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 77,
                                "title": "the Spirit Walker",
                                "name": "Udyr",
                                "key": "Udyr"
                             },
                             "Varus": {
                                "tags": [
                                   "Marksman",
                                   "Mage"
                                ],
                                "id": 110,
                                "title": "the Arrow of Retribution",
                                "name": "Varus",
                                "key": "Varus"
                             },
                             "Jayce": {
                                "tags": [
                                   "Fighter",
                                   "Marksman"
                                ],
                                "id": 126,
                                "title": "the Defender of Tomorrow",
                                "name": "Jayce",
                                "key": "Jayce"
                             },
                             "Leona": {
                                "tags": [
                                   "Tank",
                                   "Support"
                                ],
                                "id": 89,
                                "title": "the Radiant Dawn",
                                "name": "Leona",
                                "key": "Leona"
                             },
                             "Syndra": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 134,
                                "title": "the Dark Sovereign",
                                "name": "Syndra",
                                "key": "Syndra"
                             },
                             "Pantheon": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 80,
                                "title": "the Artisan of War",
                                "name": "Pantheon",
                                "key": "Pantheon"
                             },
                             "Khazix": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 121,
                                "title": "the Voidreaver",
                                "name": "Kha'Zix",
                                "key": "Khazix"
                             },
                             "Riven": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 92,
                                "title": "the Exile",
                                "name": "Riven",
                                "key": "Riven"
                             },
                             "Corki": {
                                "tags": ["Marksman"],
                                "id": 42,
                                "title": "the Daring Bombardier",
                                "name": "Corki",
                                "key": "Corki"
                             },
                             "Caitlyn": {
                                "tags": ["Marksman"],
                                "id": 51,
                                "title": "the Sheriff of Piltover",
                                "name": "Caitlyn",
                                "key": "Caitlyn"
                             },
                             "Azir": {
                                "tags": [
                                   "Mage",
                                   "Marksman"
                                ],
                                "id": 268,
                                "title": "the Emperor of the Sands",
                                "name": "Azir",
                                "key": "Azir"
                             },
                             "Nidalee": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 76,
                                "title": "the Bestial Huntress",
                                "name": "Nidalee",
                                "key": "Nidalee"
                             },
                             "Kennen": {
                                "tags": [
                                   "Mage",
                                   "Marksman"
                                ],
                                "id": 85,
                                "title": "the Heart of the Tempest",
                                "name": "Kennen",
                                "key": "Kennen"
                             },
                             "Galio": {
                                "tags": [
                                   "Tank",
                                   "Mage"
                                ],
                                "id": 3,
                                "title": "the Sentinel's Sorrow",
                                "name": "Galio",
                                "key": "Galio"
                             },
                             "Veigar": {
                                "tags": ["Mage"],
                                "id": 45,
                                "title": "the Tiny Master of Evil",
                                "name": "Veigar",
                                "key": "Veigar"
                             },
                             "Bard": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 432,
                                "title": "the Wandering Caretaker",
                                "name": "Bard",
                                "key": "Bard"
                             },
                             "Gnar": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 150,
                                "title": "the Missing Link",
                                "name": "Gnar",
                                "key": "Gnar"
                             },
                             "Malzahar": {
                                "tags": [
                                   "Mage",
                                   "Assassin"
                                ],
                                "id": 90,
                                "title": "the Prophet of the Void",
                                "name": "Malzahar",
                                "key": "Malzahar"
                             },
                             "Graves": {
                                "tags": ["Marksman"],
                                "id": 104,
                                "title": "the Outlaw",
                                "name": "Graves",
                                "key": "Graves"
                             },
                             "Vi": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 254,
                                "title": "the Piltover Enforcer",
                                "name": "Vi",
                                "key": "Vi"
                             },
                             "Kayle": {
                                "tags": [
                                   "Fighter",
                                   "Support"
                                ],
                                "id": 10,
                                "title": "The Judicator",
                                "name": "Kayle",
                                "key": "Kayle"
                             },
                             "Irelia": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 39,
                                "title": "the Will of the Blades",
                                "name": "Irelia",
                                "key": "Irelia"
                             },
                             "LeeSin": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 64,
                                "title": "the Blind Monk",
                                "name": "Lee Sin",
                                "key": "LeeSin"
                             },
                             "Illaoi": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 420,
                                "title": "the Kraken Priestess",
                                "name": "Illaoi",
                                "key": "Illaoi"
                             },
                             "Elise": {
                                "tags": [
                                   "Mage",
                                   "Fighter"
                                ],
                                "id": 60,
                                "title": "the Spider Queen",
                                "name": "Elise",
                                "key": "Elise"
                             },
                             "Volibear": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 106,
                                "title": "the Thunder's Roar",
                                "name": "Volibear",
                                "key": "Volibear"
                             },
                             "Nunu": {
                                "tags": [
                                   "Support",
                                   "Fighter"
                                ],
                                "id": 20,
                                "title": "the Yeti Rider",
                                "name": "Nunu",
                                "key": "Nunu"
                             },
                             "TwistedFate": {
                                "tags": ["Mage"],
                                "id": 4,
                                "title": "the Card Master",
                                "name": "Twisted Fate",
                                "key": "TwistedFate"
                             },
                             "Jax": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 24,
                                "title": "Grandmaster at Arms",
                                "name": "Jax",
                                "key": "Jax"
                             },
                             "Shyvana": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 102,
                                "title": "the Half-Dragon",
                                "name": "Shyvana",
                                "key": "Shyvana"
                             },
                             "Kalista": {
                                "tags": ["Marksman"],
                                "id": 429,
                                "title": "the Spear of Vengeance",
                                "name": "Kalista",
                                "key": "Kalista"
                             },
                             "DrMundo": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 36,
                                "title": "the Madman of Zaun",
                                "name": "Dr. Mundo",
                                "key": "DrMundo"
                             },
                             "TahmKench": {
                                "tags": [
                                   "Support",
                                   "Tank"
                                ],
                                "id": 223,
                                "title": "the River King",
                                "name": "Tahm Kench",
                                "key": "TahmKench"
                             },
                             "Diana": {
                                "tags": [
                                   "Fighter",
                                   "Mage"
                                ],
                                "id": 131,
                                "title": "Scorn of the Moon",
                                "name": "Diana",
                                "key": "Diana"
                             },
                             "Brand": {
                                "tags": ["Mage"],
                                "id": 63,
                                "title": "the Burning Vengeance",
                                "name": "Brand",
                                "key": "Brand"
                             },
                             "Sejuani": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 113,
                                "title": "the Winter's Wrath",
                                "name": "Sejuani",
                                "key": "Sejuani"
                             },
                             "Vladimir": {
                                "tags": [
                                   "Mage",
                                   "Tank"
                                ],
                                "id": 8,
                                "title": "the Crimson Reaper",
                                "name": "Vladimir",
                                "key": "Vladimir"
                             },
                             "Zac": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 154,
                                "title": "the Secret Weapon",
                                "name": "Zac",
                                "key": "Zac"
                             },
                             "RekSai": {
                                "tags": ["Fighter"],
                                "id": 421,
                                "title": "the Void Burrower",
                                "name": "Rek'Sai",
                                "key": "RekSai"
                             },
                             "Quinn": {
                                "tags": [
                                   "Marksman",
                                   "Fighter"
                                ],
                                "id": 133,
                                "title": "Demacia's Wings",
                                "name": "Quinn",
                                "key": "Quinn"
                             },
                             "Akali": {
                                "tags": ["Assassin"],
                                "id": 84,
                                "title": "the Fist of Shadow",
                                "name": "Akali",
                                "key": "Akali"
                             },
                             "Tristana": {
                                "tags": [
                                   "Marksman",
                                   "Assassin"
                                ],
                                "id": 18,
                                "title": "the Yordle Gunner",
                                "name": "Tristana",
                                "key": "Tristana"
                             },
                             "Hecarim": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 120,
                                "title": "the Shadow of War",
                                "name": "Hecarim",
                                "key": "Hecarim"
                             },
                             "Sivir": {
                                "tags": ["Marksman"],
                                "id": 15,
                                "title": "the Battle Mistress",
                                "name": "Sivir",
                                "key": "Sivir"
                             },
                             "Lucian": {
                                "tags": ["Marksman"],
                                "id": 236,
                                "title": "the Purifier",
                                "name": "Lucian",
                                "key": "Lucian"
                             },
                             "Rengar": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 107,
                                "title": "the Pridestalker",
                                "name": "Rengar",
                                "key": "Rengar"
                             },
                             "Warwick": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 19,
                                "title": "the Blood Hunter",
                                "name": "Warwick",
                                "key": "Warwick"
                             },
                             "Skarner": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 72,
                                "title": "the Crystal Vanguard",
                                "name": "Skarner",
                                "key": "Skarner"
                             },
                             "Malphite": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 54,
                                "title": "Shard of the Monolith",
                                "name": "Malphite",
                                "key": "Malphite"
                             },
                             "Yasuo": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 157,
                                "title": "the Unforgiven",
                                "name": "Yasuo",
                                "key": "Yasuo"
                             },
                             "Xerath": {
                                "tags": [
                                   "Mage",
                                   "Assassin"
                                ],
                                "id": 101,
                                "title": "the Magus Ascendant",
                                "name": "Xerath",
                                "key": "Xerath"
                             },
                             "Teemo": {
                                "tags": [
                                   "Marksman",
                                   "Assassin"
                                ],
                                "id": 17,
                                "title": "the Swift Scout",
                                "name": "Teemo",
                                "key": "Teemo"
                             },
                             "Renekton": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 58,
                                "title": "the Butcher of the Sands",
                                "name": "Renekton",
                                "key": "Renekton"
                             },
                             "Nasus": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 75,
                                "title": "the Curator of the Sands",
                                "name": "Nasus",
                                "key": "Nasus"
                             },
                             "Draven": {
                                "tags": ["Marksman"],
                                "id": 119,
                                "title": "the Glorious Executioner",
                                "name": "Draven",
                                "key": "Draven"
                             },
                             "Shaco": {
                                "tags": ["Assassin"],
                                "id": 35,
                                "title": "the Demon Jester",
                                "name": "Shaco",
                                "key": "Shaco"
                             },
                             "Swain": {
                                "tags": [
                                   "Mage",
                                   "Fighter"
                                ],
                                "id": 50,
                                "title": "the Master Tactician",
                                "name": "Swain",
                                "key": "Swain"
                             },
                             "Janna": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 40,
                                "title": "the Storm's Fury",
                                "name": "Janna",
                                "key": "Janna"
                             },
                             "Talon": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 91,
                                "title": "the Blade's Shadow",
                                "name": "Talon",
                                "key": "Talon"
                             },
                             "Ziggs": {
                                "tags": ["Mage"],
                                "id": 115,
                                "title": "the Hexplosives Expert",
                                "name": "Ziggs",
                                "key": "Ziggs"
                             },
                             "Ekko": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 245,
                                "title": "the Boy Who Shattered Time",
                                "name": "Ekko",
                                "key": "Ekko"
                             },
                             "Orianna": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 61,
                                "title": "the Lady of Clockwork",
                                "name": "Orianna",
                                "key": "Orianna"
                             },
                             "FiddleSticks": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 9,
                                "title": "the Harbinger of Doom",
                                "name": "Fiddlesticks",
                                "key": "FiddleSticks"
                             },
                             "Fiora": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 114,
                                "title": "the Grand Duelist",
                                "name": "Fiora",
                                "key": "Fiora"
                             },
                             "Chogath": {
                                "tags": [
                                   "Tank",
                                   "Mage"
                                ],
                                "id": 31,
                                "title": "the Terror of the Void",
                                "name": "Cho'Gath",
                                "key": "Chogath"
                             },
                             "Rammus": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 33,
                                "title": "the Armordillo",
                                "name": "Rammus",
                                "key": "Rammus"
                             },
                             "Leblanc": {
                                "tags": [
                                   "Assassin",
                                   "Mage"
                                ],
                                "id": 7,
                                "title": "the Deceiver",
                                "name": "LeBlanc",
                                "key": "Leblanc"
                             },
                             "Soraka": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 16,
                                "title": "the Starchild",
                                "name": "Soraka",
                                "key": "Soraka"
                             },
                             "Zilean": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 26,
                                "title": "the Chronokeeper",
                                "name": "Zilean",
                                "key": "Zilean"
                             },
                             "Nocturne": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 56,
                                "title": "the Eternal Nightmare",
                                "name": "Nocturne",
                                "key": "Nocturne"
                             },
                             "Jinx": {
                                "tags": ["Marksman"],
                                "id": 222,
                                "title": "the Loose Cannon",
                                "name": "Jinx",
                                "key": "Jinx"
                             },
                             "Yorick": {
                                "tags": [
                                   "Fighter",
                                   "Mage"
                                ],
                                "id": 83,
                                "title": "the Gravedigger",
                                "name": "Yorick",
                                "key": "Yorick"
                             },
                             "Urgot": {
                                "tags": [
                                   "Marksman",
                                   "Fighter"
                                ],
                                "id": 6,
                                "title": "the Headsman's Pride",
                                "name": "Urgot",
                                "key": "Urgot"
                             },
                             "Kindred": {
                                "tags": ["Marksman"],
                                "id": 203,
                                "title": "The Eternal Hunters",
                                "name": "Kindred",
                                "key": "Kindred"
                             },
                             "MissFortune": {
                                "tags": ["Marksman"],
                                "id": 21,
                                "title": "the Bounty Hunter",
                                "name": "Miss Fortune",
                                "key": "MissFortune"
                             },
                             "MonkeyKing": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 62,
                                "title": "the Monkey King",
                                "name": "Wukong",
                                "key": "MonkeyKing"
                             },
                             "Blitzcrank": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 53,
                                "title": "the Great Steam Golem",
                                "name": "Blitzcrank",
                                "key": "Blitzcrank"
                             },
                             "Shen": {
                                "tags": [
                                   "Tank",
                                   "Melee"
                                ],
                                "id": 98,
                                "title": "the Eye of Twilight",
                                "name": "Shen",
                                "key": "Shen"
                             },
                             "Braum": {
                                "tags": [
                                   "Support",
                                   "Tank"
                                ],
                                "id": 201,
                                "title": "the Heart of the Freljord",
                                "name": "Braum",
                                "key": "Braum"
                             },
                             "XinZhao": {
                                "tags": [
                                   "Fighter",
                                   "Assassin"
                                ],
                                "id": 5,
                                "title": "the Seneschal of Demacia",
                                "name": "Xin Zhao",
                                "key": "XinZhao"
                             },
                             "Twitch": {
                                "tags": [
                                   "Marksman",
                                   "Assassin"
                                ],
                                "id": 29,
                                "title": "the Plague Rat",
                                "name": "Twitch",
                                "key": "Twitch"
                             },
                             "MasterYi": {
                                "tags": [
                                   "Assassin",
                                   "Fighter"
                                ],
                                "id": 11,
                                "title": "the Wuju Bladesman",
                                "name": "Master Yi",
                                "key": "MasterYi"
                             },
                             "Taric": {
                                "tags": [
                                   "Support",
                                   "Fighter"
                                ],
                                "id": 44,
                                "title": "the Shield of Valoran",
                                "name": "Taric",
                                "key": "Taric"
                             },
                             "Amumu": {
                                "tags": [
                                   "Tank",
                                   "Mage"
                                ],
                                "id": 32,
                                "title": "the Sad Mummy",
                                "name": "Amumu",
                                "key": "Amumu"
                             },
                             "Gangplank": {
                                "tags": ["Fighter"],
                                "id": 41,
                                "title": "the Saltwater Scourge",
                                "name": "Gangplank",
                                "key": "Gangplank"
                             },
                             "Trundle": {
                                "tags": [
                                   "Fighter",
                                   "Tank"
                                ],
                                "id": 48,
                                "title": "the Troll King",
                                "name": "Trundle",
                                "key": "Trundle"
                             },
                             "Kassadin": {
                                "tags": [
                                   "Assassin",
                                   "Mage"
                                ],
                                "id": 38,
                                "title": "the Void Walker",
                                "name": "Kassadin",
                                "key": "Kassadin"
                             },
                             "Velkoz": {
                                "tags": ["Mage"],
                                "id": 161,
                                "title": "the Eye of the Void",
                                "name": "Vel'Koz",
                                "key": "Velkoz"
                             },
                             "Zyra": {
                                "tags": [
                                   "Mage",
                                   "Support"
                                ],
                                "id": 143,
                                "title": "Rise of the Thorns",
                                "name": "Zyra",
                                "key": "Zyra"
                             },
                             "Nami": {
                                "tags": [
                                   "Support",
                                   "Mage"
                                ],
                                "id": 267,
                                "title": "the Tidecaller",
                                "name": "Nami",
                                "key": "Nami"
                             },
                             "JarvanIV": {
                                "tags": [
                                   "Tank",
                                   "Fighter"
                                ],
                                "id": 59,
                                "title": "the Exemplar of Demacia",
                                "name": "Jarvan IV",
                                "key": "JarvanIV"
                             },
                             "Ezreal": {
                                "tags": [
                                   "Marksman",
                                   "Mage"
                                ],
                                "id": 81,
                                "title": "the Prodigal Explorer",
                                "name": "Ezreal",
                                "key": "Ezreal"
                             }
                          },
                          "type": "champion",
                          "version": "6.8.1"
                       };
    var championRoles = {
        FIGHTER:    [157,122,56,154,24,2,48,120,92,36,20,64,266,106,54,23,14,62,238,113,77,27,35,80,82,133,91,114,98,
            107,13,86,5,254,83,41,126,131,33,11,102,19,39,59,60,10,78,75,72,58],
        ASSASSIN:   [157,56,24,38,28,92,64,55,238,17,35,80,91,114,107,5,254,11,121,39,7],
        MAGE:       [50,57,38,28,43,99,1,101,74,16,23,9,14,55,103,8,161,61,115,105,82,134,32,79,90,81,13,86,69,83,112,
            96,131,63,143,60,7,18,127,31,30,45,26,25,117,34,85,3],
        TANK:       [50,122,154,2,48,57,120,36,89,266,106,54,62,8,113,77,27,412,32,79,98,44,12,201,86,111,33,102,19,59,
            40,53,31,6,75,3,72,58],
        SUPPORT:    [267,20,89,43,99,16,9,76,61,412,44,12,201,37,111,143,10,40,127,53,26,25,117],
        MARKSMAN:   [15,29,67,51,119,17,133,81,21,96,104,22,236,222,18,110,42,6]
    };
    var championDataById;

    activate();

    return {
        champions: champions,
        championRoles: championRoles,
        championById: championById
    };

    ////////////////////////////////////////

    function activate() {
        championDataById = filterChampionsById();
    };

    function filterChampionsById() {
        var championList = [];
        angular.forEach(championData.data, function(champ) {
            championList[champ.id] = champ;
        });
        return championList;
    }

    // Returns all the champions.
    function champions() {
        return championDataById;
    }

    // Returns a specific champion given an id.
    function championById(championId) {
        return championDataById[championId];
    }

}