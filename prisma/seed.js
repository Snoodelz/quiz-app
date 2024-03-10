const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	// Sample Quizzes with more questions
	const geographyQuiz = await prisma.quiz.create({
		data: {
			title: "Geography Trivia",
			description: "Test your knowledge of countries, capitals, and more",
			questions: {
				create: [
					// ... (previous questions from example)
					{
						text: "What country has the largest population?",
						options: {
							create: [
								{ text: "India" },
								{ text: "China", isCorrect: true },
								{ text: "United States" },
								{ text: "Indonesia" },
							],
						},
					},
					{
						text: "Which continent is Australia located on?",
						options: {
							create: [{ text: "Asia" }, { text: "Europe" }, { text: "Oceania", isCorrect: true }, { text: "Africa" }],
						},
					},
					{
						text: "What is the highest mountain in the world?",
						options: {
							create: [
								{ text: "K2" },
								{ text: "Kangchenjunga" },
								{ text: "Mount Everest", isCorrect: true },
								{ text: "Kilimanjaro" },
							],
						},
					},
				],
			},
		},
	});

	const historyQuiz = await prisma.quiz.create({
		data: {
			title: "History Challenge",
			description: "Explore historical events and figures",
			questions: {
				create: [
					{
						text: "In what year did World War II begin?",
						options: {
							create: [{ text: "1914" }, { text: "1919" }, { text: "1939", isCorrect: true }, { text: "1945" }],
						},
					},
					{
						text: "Who was the first President of the United States?",
						options: {
							create: [
								{ text: "Abraham Lincoln" },
								{ text: "Thomas Jefferson" },
								{ text: "George Washington", isCorrect: true },
								{ text: "Benjamin Franklin" },
							],
						},
					},
					// ... more history questions
				],
			},
		},
	});

	// ... Add even more quizzes, questions, and options!
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
