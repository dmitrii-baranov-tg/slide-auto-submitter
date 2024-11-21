const predefinedQuestions = [
  { question: "What is 2+2?", answer: "4" },
  { question: "What is 0+0?", answer: "0" }
];

const observerLoggingCallback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType !== 1 || node.nodeName !== 'DIV') return;
      console.log("Node DIV added: ", node);

      if (node.querySelector('button.poll__btn-submit')) {
        console.log("Submit button added!", node);
        const pollsPanel = node.closest('#live-tabpanel-polls');
        if (pollsPanel) {
          const questionTitleSpan = pollsPanel.querySelector('span.poll-question__title-text');
          if (questionTitleSpan) {
            const questionTitle = questionTitleSpan.innerHTML.trim();
            const questionMatched = predefinedQuestions.find(entry => entry.question === questionTitle);
            
            if (questionMatched) {
              console.log("Question matches predefined list!", questionMatched);
              pollsPanel.querySelectorAll('label.poll-question-option').forEach(questionOptionLabel => {
                const answerText = questionOptionLabel.childNodes[1].firstChild.innerText.trim();
                if (answerText === questionMatched.answer) {
                  console.log("Found matching answer!", questionOptionLabel);
                  questionOptionLabel.click();
                }
              });
            }
          }
        }
      }

      if (node.classList.contains('poll-area--live') && node.querySelector('div.quiz-join')) {
        console.log("Found matching quiz join div!", node);
        const quizJoinButton = node.querySelector('button[type="submit"]');
        if (quizJoinButton) {
          console.log("Quiz join button added! Auto-clicking it!", quizJoinButton);
          setTimeout(() => { quizJoinButton.click(); }, 300);
        }
      }
    });
  });
};

const observer = new MutationObserver(observerLoggingCallback);
const config = { childList: true, subtree: true };
observer.observe(document.querySelector('#live-tabpanel-polls'), config);

document.addEventListener('change', function(event) {
  if (event.target && event.target.matches('input[type="radio"]')) {
    console.log("Radio button change event happened!", event);
    const button = event.target.closest('.poll-area--live').querySelector('.poll__btn-submit');
    if (button) {
      console.log("Submit button is found and auto-clicked!", button);
      button.click();
    }
  }
});
