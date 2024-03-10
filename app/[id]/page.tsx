import prisma from "@/db";
import { correctQuiz } from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
	// check if params.id is a number and return a 404 if it's not
	if (!params.id || isNaN(parseInt(params.id))) return <div>Invalid ID</div>;

	const quizWithQuestions = await prisma.quiz.findFirst({
		where: {
			id: parseInt(params.id),
		},
		include: {
			questions: {
				include: {
					options: true,
				},
			},
		},
	});

	// check if quiz is null and return a 404 if it is
	if (!quizWithQuestions) return <div>Quiz not found</div>;

	const correctQuizWithId = correctQuiz.bind(null, quizWithQuestions.id);
	return (
		<div className="container my-4">
			<h1 className="m-auto w-fit text-4xl">{quizWithQuestions?.title}</h1>
			<p className="m-auto w-fit text-2xl">{quizWithQuestions?.description}</p>
			<form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" action={correctQuizWithId}>
				{quizWithQuestions?.questions.map((question) => (
					<div className="border p-4 rounded-lg" key={question.id}>
						<h2 className="text-2xl">{question.text}</h2>
						<ul>
							{question.options.map((option) => (
								<li className="flex items-center" key={option.id}>
									<input
										type="radio"
										id={option.id.toString()}
										name={question.id.toString()}
										value={option.id.toString()}
									/>
									<label className="ml-2" htmlFor={option.id.toString()}>
										{option.text}
									</label>
								</li>
							))}
						</ul>
					</div>
				))}
				<button
					className="col-span-2 bg-primary text-primary-foreground rounded-lg p-4 hover:bg-slate-700"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
