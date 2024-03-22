"use client";
import { useRouter } from "next/navigation";

export default function ProposalForm() {
  const router = useRouter();

  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-5">
      <div className="flex flex-row items-center justify-between w-full h-14 font-bold text-2xl">
        <p
          className="bg-gradient-to-r from-white to-transparent rounded-l-3xl py-1 px-2"
          onClick={() => router.back()}
        >
          &lt;-
        </p>
        <p>Sample Proposal</p>
        <p className="px-6"></p>
      </div>

      <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6 text-sm">
        <h1 className="font-semibold text-center text-base">
          Impact Tour: Experimenting with a Measurable Foundation for
          Sustainable Tourism
        </h1>
        <p>
          <strong>Summary:</strong> The Impact Tour initiative aims to
          revolutionize the tourism industry by integrating measurable
          sustainability metrics directly into tour experiences. This project
          seeks to empower travelers, businesses, and local communities to make
          informed decisions that promote environmental conservation and
          socio-economic benefits.
        </p>

        <p>
          {" "}
          <strong>Problem:</strong> The tourism industry often contributes to
          environmental degradation and can strain local communities and
          resources. A paradigm shift towards sustainable practices is needed,
          yet a lack of reliable, measurable data impedes progress.
        </p>

        <p>
          <strong>Solution:</strong> The Impact Tour proposes a platform that
          integrates real-time environmental and social impact data into the
          tourism experience, promoting sustainable practices and rewarding
          responsible choices.
        </p>
        <ul>
          <strong>Specifications:</strong>
          <li>
            Platform Development: Utilizing web and mobile applications for user
            accessibility.
          </li>
          <li>
            Data Integration: Leveraging IoT devices for real-time environmental
            data collection and APIs for socio-economic statistics.
          </li>
          <li>
            Blockchain Technology: Implementing blockchain for transparent and
            verifiable reporting of sustainability practices.
          </li>
          <li>
            AI & Analytics: Utilizing AI for data analysis and personalized
            recommendations for sustainable practices.
          </li>
        </ul>

        <ul>
          <strong>Steps to Implement:</strong>
          <li>
            Research & Development: Conduct comprehensive research on
            sustainable tourism metrics and technology solutions.
          </li>
          <li>
            Platform Design: Design the user interface and experience for the
            web and mobile applications.
          </li>
          <li>
            Technology Integration: Develop the platform's backend, integrate
            IoT devices, blockchain, and AI functionalities.
          </li>
          <li>
            Pilot Testing: Launch a pilot program in selected tourist
            destinations to refine and validate the platform.
          </li>
          <li>
            Full-Scale Rollout: Expand the platform's availability and engage
            with a broader range of stakeholders.
          </li>
        </ul>

        <ul>
          <strong>Collaborators:</strong>
          <li>Local and national tourism boards</li>
          <li>Environmental NGOs</li>
          <li>Technology partners specializing in IoT, blockchain, and AI</li>
          <li>Academic institutions for research support</li>
          <li>Local communities and businesses in the tourism sector</li>
        </ul>

        <p>
          <strong>Timeline:</strong>
          Research & Development: Jan 2025 - Jun 2025
          <br />
          Platform Design & Technology Integration: Jul 2025 - Dec 2025
          <br />
          Pilot Testing: Jan 2026 - Jun 2026
          <br />
          Full-Scale Rollout: Jul 2026 onwards
        </p>

        <ul>
          <strong>Milestones:</strong>
          <li>Completion of R&D phase by Jun 2025</li>
          <li>Beta version of the platform ready by Dec 2025</li>
          <li>Successful pilot in 3 destinations by Jun 2026</li>
          <li>Expansion to additional 10 destinations by Dec 2026</li>
        </ul>

        <p>
          <strong>Budget:</strong>
          The total estimated cost for the Impact Tour project is $2.5 million,
          covering research, platform development, pilot testing, and initial
          rollout phases. This budget includes technology acquisition,
          personnel, marketing, and operational expenses.
        </p>
      </div>
    </div>
  );
}
