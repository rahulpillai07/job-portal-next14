import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
import {jobTypes} from "@/lib/job-types"
import { Button } from "./ui/button";
async function filterJobs(formData: FormData) {
  "use server";
  console.log(formData.get("q") as string);
}
export default async function JobFilterSidebar() {
  const distinctLocations = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ["location"],
  });
  const mappedLocations = distinctLocations
    .map(({ location }) => location)
    .filter(Boolean) as string[];
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input name="q" placeholder="Title,company,etc." id="q" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All locations</option>
              {mappedLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
                id="remote"name="remote" type="checkbox" className="scale-125 accent-black"/>
                <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">Filter jobs</Button>
        </div>
      </form>
    </aside>
  );
}
