export interface Founder {
    name: string;
    position: string;
    image: string;
    description: string;
}

export interface TrusteeGroup {
    id: number;
    image: string;
    members: { name: string; position: string }[];
}

export interface Member {
    name: string;
    position: string;
    image: string;
}

export const trusteeGroups: TrusteeGroup[] = [
    {
        id: 1,
        image: "/images/trusteemembers/founder.jpeg",
        members: [
            { name: "Dr Ashish Mitra", position: "Founder Trustee" },
            { name: "Neeta Mitra", position: "Founder Trustee" },
        ],
    },
    {
        id: 2,
        image:
            "/images/trusteemembers/Founder Trustee Dr Somendu Ghosh & Smt Aparna Ghosh.jpeg",
        members: [
            { name: "Dr Somendu Ghosh", position: "Founder Trustee" },
            { name: "Smt Aparna Ghosh", position: "Founder Trustee" },
        ],
    },
    {
        id: 3,
        image: "/images/placeholder.png",
        members: [{ name: "Powshali Chatterjee", position: "President" }],
    },
    {
        id: 4,
        image: "/images/trusteemembers/Pallab Bhanja Chaudhary Vice President.jpeg",
        members: [{ name: "Pallab Bhanja Chaudhary", position: "Vice President" }],
    },
    {
        id: 5,
        image: "/images/placeholder.png",
        members: [{ name: "Protima Roychowdhury", position: "Secretary" }],
    },
];

export const foundingMembers: Member[] = [
    {
        name: "Shri Arun Dey and Shrimati Deepti Dey",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Arun Dey and Shrimati Deepti Dey Founder member.jpeg",
    },
    {
        name: "Shri Alok Bhattacharya & Smt Nibedita Bhattacharya",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Alok Bhattacharya & Smt Nibedita Bhattacharya.jpeg",
    },
    {
        name: "Shri Abhrajeet Dey & Smt Mahua Dey",
        position: "Founding Member",
        image: "/images/foundingMembers/Shri Abhrajeet Dey & Smt Mahua Dey.jpeg",
    },
    {
        name: "Shri R.K.Dutta Roy & Smt Lajumita Dutta",
        position: "Founding Member",
        image:
            "/images/trusteemembers/Shri R.K.Dutta Roy & Smt Lajumita Dutta.jpeg",
    },
    {
        name: "Shri Amaresh Chatterjee & Smt Snigdha Chatterjee",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Amaresh Chatterjee & Smt Snigdha Chatterjee.jpeg",
    },
    {
        name: "Shri Aniket Mukherjee & Smt Sonakshi Mukherjee",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Aniket Mukherjee & Smt Sonakshi Mukherjee.jpeg",
    },
    {
        name: "Shri Anil Roy & Smt Sunita Roy",
        position: "Founding Member",
        image: "/images/foundingMembers/Shri Anil Roy & Smt Sunita Roy.jpeg",
    },
    {
        name: "Shri Arpan Ghosh & Late Smt Manjula Ghosh",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Arpan Ghosh & Late Smt Manjula Ghosh.jpeg",
    },
    {
        name: "Shri Arup Banerjee & Smt Ruma Banerjee",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Arup Banerjee & Smt Ruma Banerjee.jpeg",
    },
    {
        name: "Shri Boren Roy & Smt Deepali Roy",
        position: "Founding Member",
        image: "/images/foundingMembers/Shri Boren Roy & Smt Deepali Roy.jpeg",
    },
    {
        name: "Shri Debashish Chakraborty & Smt Boisakhi Chakraborty",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Debashish Chakraborty & Smt Boisakhi Chakraborty.jpeg",
    },
    {
        name: "Shri Debashish Chakraborty & Smt Geetanjali Chakraborty",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Debashish Chakraborty & Smt Geetanjali Chakraborty.jpeg",
    },
    {
        name: "Shri S.K.Sengupta",
        position: "Founding Member",
        image: "/images/foundingMembers/Shri S.K.Sengupta.jpeg",
    },
    {
        name: "Shri Santosh Roy & Smt Reeta Roy",
        position: "Founding Member",
        image: "/images/foundingMembers/Shri Santosh Roy & Smt Reeta Roy.jpeg",
    },
    {
        name: "Shri Shiv Kumar Ghosh & Smt Sumita Ghosh",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Shri Shiv Kumar Ghosh & Smt Sumita Ghosh.jpeg",
    },
    {
        name: "Smt Protima Ghosh & Late Shri N.K.Ghosh",
        position: "Founding Member",
        image:
            "/images/foundingMembers/Smt Protima Ghosh & Late Shri N.K.Ghosh.jpeg",
    },
];
