"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TeamsAvatar = [
  {
    githubUsername: "SolonkoNora",
    role: "Frontend Developer",
  },
  {
    githubUsername: "EwiJosepha",
    role: "Fullstack Developer",
  },
  {
    githubUsername: "RashJrEdmund",
    role: "{}",
  },
  {
    githubUsername: "GaelTikeng",
    role: "Frontend Developer",
  },
];

const getAccountUrl = (username: string, image: boolean = false) =>
  `https://github.com/${username}${image ? ".png" : ""}`;

export default function Team() {
  const [currentMember, setCurrentMember] = useState<typeof TeamsAvatar[number]>(TeamsAvatar[0]);

  return (
    <main className="w-full bg-primary-color mt-10 gap-4 pt-20 pb-20">
      <div className="flex gap-8 mx-auto max-w-[92vw] xl:mx-40 items-center">
        <div className="w-full group hidden md:block bg-secondary-color">
          <Image
            alt="My Icon"
            width={500}
            height={500}
            layout="responsive"
            src={getAccountUrl(currentMember.githubUsername, true)}
          />

          <div className="group text-xl items-center p-2 hover:rounded-sm hover:cursor-pointer">
            <Link
              href={getAccountUrl(currentMember.githubUsername)}
              className="text-primary-color"
              target="_blank"
            >
              {currentMember.githubUsername}
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {TeamsAvatar.map(
            ({ githubUsername, role }, index) => (
              <div
                key={index}
                className="cursor-pointer md:min-w-[100%]"
                onClick={() => setCurrentMember({ githubUsername, role })}
              >
                <Image
                  src={getAccountUrl(githubUsername, true)}
                  alt="My Avatar"
                  width={500}
                  height={500}
                />

                <Link
                  href={getAccountUrl(githubUsername)}
                  target="_blank"
                  className="text-secondary-color cursor-pointer font-bold p-3"
                >
                  {githubUsername}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
