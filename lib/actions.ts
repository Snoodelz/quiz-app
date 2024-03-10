"use server";

import prisma from "@/db";

export async function correctQuiz(quizId: number, formdata: FormData) {
	const correctAnswers = await prisma.question.findMany({
		where: {
			quizId: quizId,
		},
		select: {
			id: true, // Select the question id
			options: {
				where: {
					isCorrect: true,
				},
				select: {
					id: true, // Select the option id
				},
			},
		},
	});

	// Convert FormData to a JavaScript object
	const formDataObj = Object.fromEntries(formdata);

	// Create a map from the formdata object
	const formdataMap = new Map(Object.entries(formDataObj));

	// Iterate over the array of correct answers
	for (const question of correctAnswers) {
		const correctOptionId = question.options[0].id;
		const userOptionId = formdataMap.get(String(question.id));

		if (typeof userOptionId === "string") {
			const userOptionIdNumber = Number(userOptionId);
			if (correctOptionId !== userOptionIdNumber) {
				console.log(
					`Question ${question.id}: incorrect answer. Correct is ${correctOptionId}, user selected ${userOptionIdNumber}`
				);
			} else {
				console.log(`Question ${question.id}: correct answer.`);
			}
		} else {
			console.log(`Question ${question.id}: no answer provided.`);
		}
	}
}
