"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/constants/animation";
import {
    // founders,
    trusteeGroups,
    foundingMembers,
    type Founder,
    type TrusteeGroup,
    type Member,
} from "@/constants/leadership";



function SectionLabel({
                          eyebrow,
                          title,
                          desc,
                      }: {
    eyebrow: string;
    title: string;
    desc: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
        >
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-4 text-ink">{title}</h2>
            <p className="text-ink/60 mt-3 text-sm sm:text-base leading-relaxed">{desc}</p>
        </motion.div>
    );
}



function FounderFeature({ founder }: { founder: Founder }) {
    return (
        <div className="mt-20 sm:mt-24">
            <SectionLabel
                eyebrow="Founder Trustees"
                title="Our Leadership Team"
                desc="Meet the visionaries who continue to guide our mission."
            />
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-8"
            >
                {trusteeGroups.map((group) => (
                    <TrusteeGridCard key={group.id} group={group} />
                ))}
            </motion.div>
        </div>
    );
}




function TrusteeGridCard({ group }: { group: TrusteeGroup }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-gold-light/20 shadow-sm overflow-hidden card-hover"
        >
            <div className="grid sm:grid-cols-2 h-full">
                <div className="relative h-64 sm:h-auto sm:min-h-[320px]">
                    <Image
                        src={group.image}
                        alt={group.members.map((m) => m.name).join(" & ")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
          <span className="text-maroon uppercase tracking-widest text-xs font-semibold">
            Leadership Team
          </span>
                    <div className="w-14 h-1 bg-gold rounded-full mt-3 mb-5" />
                    <div className="grid gap-4">
                        {group.members.map((member) => (
                            <div key={member.name} className="border-l-4 border-maroon pl-4">
                                <h4 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                                    {member.name}
                                </h4>
                                <p className="text-maroon text-sm font-medium mt-1">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function MemberGridCard({ member }: { member: Member }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold-light/20 card-hover"
        >
            <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition duration-500 hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>
            <div className="p-5 text-center">
                <h4 className="font-serif text-lg font-semibold text-ink">{member.name}</h4>
                <p className="text-maroon text-sm mt-1.5">{member.position}</p>
            </div>
        </motion.div>
    );
}



export default function LeadershipDirectory() {
    return (
        <section className="pb-16 sm:pb-24 bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6">


                <div className="mt-20 sm:mt-24">
                    <SectionLabel
                        eyebrow="Founder Trustees"
                        title="Our Leadership Team"
                        desc="Meet the visionaries who continue to guide our mission."
                    />
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-8"
                    >
                        {trusteeGroups.map((group) => (
                            <TrusteeGridCard key={group.id} group={group} />
                        ))}
                    </motion.div>
                </div>


                <div className="mt-20 sm:mt-24">
                    <SectionLabel
                        eyebrow="Founding Members"
                        title="Founding Members"
                        desc="Dedicated individuals working together for social welfare."
                    />
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
                    >
                        {foundingMembers.map((member) => (
                            <MemberGridCard key={member.name} member={member} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}