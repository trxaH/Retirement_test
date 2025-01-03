class Quiz {
  constructor() {
    this.imagePatch = `pics`;

    this.QUIZ = [
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `As you prepare to embark on a long journey, you pack your bag. <br> How do you pack?`,
        answers: {
          Wealth: `Bring the bare minimum`,
          Capital: `Pack everything you might need`,
          Legacy: `Pack half and wash there`,
          Income: `Pack half and buy the rest there`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `Who is accompanying you to see the Northern Lights?`,
        answers: {
          Capital: `2 - 3 friends to split cost`,
          Legacy: `Bring the whole kampong`,
          Wealth: `Traveling solo for adventure`,
          Income: `Join a tour group for convenience`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `It's time to head to the airport. <br> How early do you leave?`,
        answers: {
          Legacy: `Leave 3 hours early to go shopping/eating`,
          Capital: `Leave 3 hours early because kiasu`,
          Income: `Leave 2 hours before to be just right on time`,
          Wealth: `Leave 1 hour before your flight`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `While queuing to check in your luggage, someone tries to cut in front of you. <br> Do you:`,
        answers: {
          Capital: `Let them cut in front of you hoping that someone else will speak up`,
          Legacy: `Ask them nicely to join the queue behind you`,
          Wealth: `Speak loudly to get them to join the queue`,
          Income: `Let them cut in front of you to avoid creating a scene`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `At the check in counter, you're told that your flight is delayed. What do you do first?`,
        answers: {
          Income: `Pay extra to get onto the next available flight`,
          Wealth: `Create a ruckus`,
          Capital: `Wait for the delayed flight`,
          Legacy: `Claim full compensation from insurance happily`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `You still have 30 minutes before your flight and you're feeling hungry. What do you do?`,
        answers: {
          Wealth: `Eat at a restaurant at the transit area`,
          Capital: `Wait for the in-flight meal`,
          Legacy: `Get a snack at the convenience store`,
          Income: `Buy a takeaway at transit area and eat on the aircraft`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ``,
        question: `Seated at the window seat, you're enjoying the view when you notice the person next to you is sleeping. What do you do?`,
        answers: {
          Wealth: `Continue enjoying the view with the shade up`,
          Legacy: `Pull down the window shade fully`,
          Capital: `Lower the shade halfway so you can still enjoy the view`,
          Income: `Leave the shade up until they ask you to close it`,
        },
      },
      {
        image: `quiz-Q1.png`,
        transition: ` `,
        question: `At the baggage claim, you notice someone struggling to lift their luggage. Do you:`,
        answers: {
          Legacy: `Offer to help them`,
          Income: `Take your luggage and walk away`,
          Capital: `Look around to see if anyone else is offering help`,
          Wealth: `Take their luggage for them`,
        },
      },
      // { //only show when got tie-breaker
      //   image: `quiz-Q9.png`,
      //   transition: ``,
      //   question: `When you are at the Northern Lights, for your first picture, do you: `,
      //   answers: {
      //     // Sensing: `Get drawn to the sights, sounds and smells`,
      //     // Intuition: `Wonder if night markets will always exist and what they represent`,
      //     Capital: `Take a selfie`,
      //     Wealth: `Ask someone to take pictures of you`,
      //     Income: `Take pictures of the scenery`,
      //     Legacy: `Live in the moment and enjoy it without taking pictures`,
      //   },
      // },
    ].map((v, i) => ({ ...v, id: i + 1 }));

    this.RESULT = [
      {
        url: "result-capital-preservation.html",
        format: "CAPITAL PRESERVATION",
      },
      {
        url: "result-wealth-accumulation.html",
        format: "WEALTH ACCUMULATION",
      },
      {
        url: "result-income-generation.html",
        format: "INCOME GENERATION",
      },
      {
        url: "result-legacy-planning.html",
        format: "LEGACY PLANNING",
      },
    ].map((v, i) => ({
      ...v,
      id: i + 1,
      formatCheck: v.format,
    }));

    this.currentQuizID = 1;
    this.userAnswers = new Array();
  }

  run() {
    if (this.QUIZ && this.QUIZ.length && this.RESULT && this.RESULT.length) {
      this.renderQuiz(this.currentQuizID);
    }
  }

  renderQuiz(quizID) {
    if (quizID && !isNaN(quizID)) {
      const quizData = this.QUIZ.find((v) => v.id === quizID);
      const isLastQuiz = quizID >= this.QUIZ.length;

      if (quizData) {
        document.title = `Retirement Quiz | Lion Global Investors`;

        const quizRender = document.getElementById("quiz-render");

        if (quizRender) {
          quizRender.innerHTML = `
                    <div class="uk-card quiz-card" data-id="${quizData.id}">
                        <div class="ans-banner-container">
                            <img class="quiz-cover-image" src="pic/${quizData.image}" alt="Quiz Cover Image">
                        </div>
                        <div class="quiz-info">
                            <p class="quiz-desc" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false; delay: 500">${quizData.question}</p>
                            <div class="quiz-options">
                                ${Object.entries(quizData.answers).map(([key, value]) => `
                                <div class="quiz-option" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true; delay: 600">
                                    <input id="quiz-${quizData.id}-${key}" type="radio" name="quiz-${quizData.id}" value="${key}">
                                    <label for="quiz-${quizData.id}-${key}">
                                        ${value}
                                    </label>
                                </div>`).join("")}
                            </div>
                        </div>
                    </div>`;

          const quizOptions = document.querySelectorAll(".quiz-option input");

          if (quizOptions.length > 0) {
            quizOptions.forEach((option) => {
              option.addEventListener("change", () => {
                quizOptions.forEach((el) => el.setAttribute("disabled", true));

                const selectedInput = document.querySelector(".quiz-option input:checked");

                if (selectedInput) {
                  const answer = selectedInput.value;
                  this.userAnswers.push({ quizID, answer });
                  console.log("renderQuiz => userAnswers -", this.userAnswers);

                  setTimeout(() => {
                    if (isLastQuiz) {
                      this.showResult();
                    } else {
                      this.renderQuiz(quizID + 1);
                    }
                  }, 500);
                }
              });
            });
          }
        }
      }
    }
  }






  showResult() {
    console.log("showResult => userAnswers -", this.userAnswers);
    if (this.userAnswers && this.userAnswers.length) {
      // const answerString = this.userAnswers
      //   .map((a) => a.answer.toLowerCase())
      //   .join(",");
      // // console.log( 'showResult => answerString -', answerString );
      // const resultData = this.RESULT.find(
      //   (r) => r.formatCheck === answerString
      // );
      // console.log("showResult => resultData -", resultData);

      // if (resultData) {
      //   location.href = resultData.url;
      // }

      let answerArray = this.userAnswers.map((item) => item.answer.charAt(0));
      function countElements(value) {
        return answerArray.filter((x) => x === value).length;
      }
      // console.log("Capital", countElements("Capital"));
      // console.log("----------------");
      // console.log("Wealth", countElements("Wealth"));
      // console.log("----------------");
      // console.log("Income", countElements("Income"));
      // console.log("----------------");
      // console.log("Legacy", countElements("Legacy"));
      // console.log("----------------");

      // ALLOCATING TO EACH QUESTIONS' ANSWER TO RETIREMENT GOAL (PUT ALL HERE) !!CHECK
      if (countElements("Capital") > countElements("Wealth") && countElements("Capital") > countElements("Income") && countElements("Capital") > countElements("Legacy")){
          // let fistAnswerKey = "Capital";
          // console.log({ fistAnswerKey });
        // document.location.href = "result-capital-preservation.html";
        location.href = resultData.url;
      }  
      else if (countElements("Wealth") > countElements("Capital") && countElements("Wealth") > countElements("Income") && countElements("Wealth") > countElements("Legacy")){
        let secondAnswerKey = "Wealth";
        console.log({ secondAnswerKey });
      }
      else if (countElements("Income") > countElements("Capital") && countElements("Income") > countElements("Wealth") && countElements("Income") > countElements("Legacy")){
        let thridAnswerKey = "Income";
        console.log({ thridAnswerKey });
      }
      else if (countElements("Legacy") > countElements("Capital") && countElements("Legacy") > countElements("Wealth") && countElements("Legacy") > countElements("Income")){
        let fourthAnswerKey = "Legacy";
        console.log({ fourthAnswerKey });
      }
      
      // let fistAnswerKey =
      //   countElements("Capital") > countElements("Wealth")
      //     ? "Capital"
      //     : countElements("I") > countElements("E")
      //       ? "I"
      //       : "E";

      // let secondAnswerKey =
      //   countElements("N") > countElements("S")
      //     ? "N"
      //     : countElements("S") > countElements("N")
      //       ? "S"
      //       : "N";
      // console.log({ secondAnswerKey });
      // let thridAnswerKey =
      //   countElements("T") > countElements("F")
      //     ? "T"
      //     : countElements("F") > countElements("T")
      //       ? "F"
      //       : "T";
      // console.log({ thridAnswerKey });
      // let fourthAnswerKey =
      //   countElements("P") > countElements("J")
      //     ? "P"
      //     : countElements("J") > countElements("P")
      //       ? "J"
      //       : "P";
      // console.log({ fourthAnswerKey });

      // let answerString = [
      //   fistAnswerKey,
      //   secondAnswerKey,
      //   thridAnswerKey,
      //   fourthAnswerKey,
      // ]
      // // ].join("");
      // // console.log({ answerString });
      // const resultData = this.RESULT.find(
      //   (r) => r.formatCheck === answerString
      // );
      // console.log({ resultData });
      // if (resultData) {
      //   location.href = resultData.url;
      // }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const quiz = new Quiz();
  quiz.run();
});