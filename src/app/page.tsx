import prisma from "@/lib/prisma"
import JobFilterSidebar from "@/components/JobFilterSideBar"
import JobListItem from "@/components/JobListItem"
import JobResults from "@/components/JobResults"
import { JobFilterValues } from "@/lib/validation"
interface PageProps{
  searchParams:{
    q?:string,
    type?:string,
    location?:string,
    remote?:string
  }
}

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return(
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground"> Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar/>
        <JobResults filterValues={filterValues} />
     
      </section>
     
     

    </main>
  )
}