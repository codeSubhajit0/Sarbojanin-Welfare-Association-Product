"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import AutoCarousel from "./ui/AutoCarousel";
import {
    trusteeGroups,
    foundingMembers,
    type Founder,
    type TrusteeGroup,
    type Member,
} from "@/constants/leadership";

function FounderCard({ founder }: { founder: Founder }) {
    return (
        <motion.div
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-gold-light/20 overflow-hidden"
        >
            <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/5] sm:aspect-[5/6] bg-[#faf7f2]">
                    <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-contain rounded-2xl p-6 sm:p-8"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                <div className="p-6 sm:p-10 flex flex-col justify-center">
          <span className="text-maroon uppercase tracking-wider font-semibold text-sm">
            Founder
          </span>
                    <div className="w-20 h-1 bg-gold rounded-full my-5" />

                    <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                        {founder.name}
                    </h4>
                    <p className="text-maroon font-medium mt-1">{founder.position}</p>

                    <p className="text-ink/70 leading-7 mt-6">{founder.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

function TrusteeCard({ group }: { group: TrusteeGroup }) {
    return (
        <motion.div
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-gold-light/20 overflow-hidden lg:h-[640px]"
        >
            <div className="grid lg:grid-cols-2 h-full">
                <div className="relative h-72 sm:h-96 lg:h-full bg-[#faf7f2]">
                    <div className="absolute inset-0 p-6 sm:p-8 lg:p-10 rounded-2xl overflow-hidden">
                        <Image
                            src={group.image}
                            alt={group.members.map((m) => m.name).join(" & ")}
                            fill
                            className="object-contain rounded-2xl"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <span className="text-maroon uppercase tracking-widest text-xs font-semibold">
            Leadership Team
          </span>
                    <div className="w-16 h-1 bg-gold rounded-full mt-4 mb-6 sm:mb-8" />

                    <div className="grid gap-4 sm:gap-6">
                        {group.members.map((member) => (
                            <div key={member.name} className="border-l-4 border-maroon pl-5">
                                <h4 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-ink">
                                    {member.name}
                                </h4>
                                <p className="text-maroon font-medium mt-1 text-sm sm:text-base">
                                    {member.position}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function MemberCard({ member }: { member: Member }) {
    return (
        <motion.div
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border border-gold-light/20 overflow-hidden"
        >
            <div className="grid sm:grid-cols-2 sm:h-72 lg:h-80">

                <div className="relative h-56 sm:h-full bg-[#faf7f2] p-6 overflow-hidden">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain rounded-2xl"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* Content */}
                <div className="min-w-0 min-h-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-center overflow-hidden">
          <span className="text-maroon uppercase tracking-widest text-xs font-semibold shrink-0">
            Founding Member
          </span>

                    <div className="w-16 h-1 bg-gold rounded-full mt-4 mb-6 shrink-0" />

                    <div className="border-l-4 border-maroon pl-5 min-w-0 min-h-0">
                        <h4 className="font-serif text-xl sm:text-2xl lg:text-2xl font-semibold text-ink leading-tight break-words">
                            {member.name}
                        </h4>

                        <p className="text-maroon font-medium mt-2 break-words">
                            {member.position}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}



function SubHeading({
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
        >
            <span className="section-eyebrow">{eyebrow}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-4 text-ink">
                {title}
            </h3>
            <p className="text-ink/60 mt-3 text-sm sm:text-base leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
}


export default function LeadershipSection() {
    return (
        <section className="py-16 sm:py-24 bg-[#faf7f2]">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <span className="section-eyebrow">Leadership & Founding Members</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-4 text-ink">
                        Guiding Our Mission With Vision & Dedication
                    </h2>
                    <p className="text-ink/70 mt-5">
                        Meet the dedicated individuals whose commitment, leadership and
                        compassion continue to shape the future of Sarbojonin Welfare
                        Association.
                    </p>
                </motion.div>


                <div className="mt-20 sm:mt-24">
                    <SubHeading
                        eyebrow="Founder Trustees"
                        title="Our Leadership Team"
                        desc="Meet the visionaries who continue to guide our mission."
                    />
                    <div className="mt-8 sm:mt-10 max-w-6xl mx-auto">
                        <AutoCarousel autoplayDelay={4500}>
                            {trusteeGroups.map((group) => (
                                <TrusteeCard key={group.id} group={group} />
                            ))}
                        </AutoCarousel>
                    </div>
                </div>


                <div className="mt-20 sm:mt-24">
                    <SubHeading
                        eyebrow="Founding Members"
                        title="Founding Members"
                        desc="Dedicated individuals working together for social welfare."
                    />
                    <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
                        <AutoCarousel autoplayDelay={4000}>
                            {foundingMembers.map((member) => (
                                <MemberCard key={member.name} member={member} />
                            ))}
                        </AutoCarousel>
                    </div>
                </div>


                <div className="mt-16 sm:mt-20 text-center">
                    <Link href="/leadership" className="btn-primary inline-flex">
                        View All Leadership <FaArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
