import openai from "@/utils/OpenAi";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const proposalName = params.params[0];
    const companyName = params.params[1] ? params.params[1] : "COMPANY-NAME";
    const introPrompt = `Write an introduction message from ${companyName} for the ${proposalName} proposal. Introduce your company and highlight the key benefits of your products or services. For example:

  Hello and welcome to our ${proposalName} proposal! We are ${companyName}, a leading provider of [products/services]. Our mission is to [mission statement or key objective]. With our [unique selling point], we are committed to helping businesses like yours [achieve specific goals]. Feel free to reach out to us with any questions or for more information. Together, let's pave the way for success!
  `;
    const goalsPrompt = `Write the goals section for a ${proposalName} proposal for ${companyName}. Ensure the response consists of at least three points, each point separated by a new line, always return an array. Each point should be listed in a separate line.For example:
  - Point one
  - Point two
  - Point three`;
    const objectivesPrompt = `Write the objectives section for a ${proposalName} proposal for ${companyName}. Ensure the response consists of at least three points, each point separated by a new line, always return an array. Each point should be listed in a separate line.For example:
  - Point one
  - Point two
  - Point three`;
    const whyChooseUsPrompt = `Write the whyChooseUs section for a ${proposalName} proposal for ${companyName}. Ensure the response consists of points highlighting reasons to choose us, always return an array. Each point should be listed in a separate line. For example:
  - Reason one
  - Reason two
  - Reason three
  - Reason four
  - Reason five`;

    const introCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: introPrompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const goalsCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: goalsPrompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const objectivesCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: objectivesPrompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const whyChooseUsCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: whyChooseUsPrompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const res = {
      proposalName: proposalName,
      companyName: companyName,
      intro: JSON.parse(introCompletion?.choices[0]?.message?.content ?? "{}")
        ?.message,
      goals: JSON.parse(goalsCompletion?.choices[0]?.message?.content ?? "{}")
        ?.goals,
      objectives:
        JSON.parse(objectivesCompletion?.choices[0]?.message?.content ?? "{}")
          ?.objectives ??
        JSON.parse(objectivesCompletion?.choices[0]?.message?.content ?? "{}")
          ?.Objectives,
      whyChooseUs: JSON.parse(
        whyChooseUsCompletion?.choices[0]?.message?.content ?? "{}"
      )?.whyChooseUs,
    };

    return new Response(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error!");
  }
}
