(function () {
    "use strict";

    /* Mensajes de marca según nº de aciertos (0-12) */
    var MESSAGES = [
        { title: "El cielo por descubrir", text: "Momentum Derma reúne doce protocolos bajo un mismo cielo, y todavía no has trazado tu primera ruta. Cada dios de esta constelación responde a un estado de la piel — y ese aprendizaje empieza ahora." },
        { title: "Primeras coordenadas", text: "Has situado los primeros astros en el mapa. El astrolabio de Momentum Derma tiene doce posiciones, y ya reconoces alguna." },
        { title: "El astrolabio en tus manos", text: "Empiezas a leer el instrumento: sabes qué protocolo responde a qué necesidad de la piel. Quedan constelaciones enteras por alinear." },
        { title: "Momentum en marcha", text: "Tu conocimiento ya tiene inercia propia. Distingues a Cronos de Eirene, a Afrodita de Atenea — la piel ha dejado de ser un territorio ajeno." },
        { title: "Casi en órbita", text: "Conoces el mapa casi tan bien como quien lo trazó. Solo un protocolo se resiste todavía a encajar en tu constelación." },
        { title: "Maestría celeste", text: "Dominas los doce protocolos de Momentum Derma como si tú misma hubieras calibrado el astrolabio. La piel — la tuya y la de quien te pregunte — está en las mejores manos." }
    ];

    /* Umbrales para 12 preguntas */
    var THRESHOLDS = [
        { min: 12, index: 5 },
        { min: 10, index: 4 },
        { min: 7,  index: 3 },
        { min: 5,  index: 2 },
        { min: 2,  index: 1 },
        { min: 0,  index: 0 }
    ];

    function readAnswer(question) {
        try {
            return sessionStorage.getItem("respuesta-" + question);
        } catch (e) {
            return null;
        }
    }

    var blocks = document.querySelectorAll(".results__question-block");
    var total = blocks.length;
    var score = 0;

    blocks.forEach(function (block) {
        var question = block.dataset.question;
        var given = readAnswer(question);
        var options = block.querySelectorAll(".results__option");
        var isCorrectAnswer = false;

        options.forEach(function (opt) {
            var isCorrect = opt.dataset.correct === "true";
            var wasSelected = opt.dataset.value === given;

            if (isCorrect) {
                opt.classList.add("is-correct");
            }
            if (wasSelected && !isCorrect) {
                opt.classList.add("is-wrong");
            }
            if (wasSelected && isCorrect) {
                isCorrectAnswer = true;
            }
        });

        if (isCorrectAnswer) score++;
    });

    /* Determinar mensaje según umbrales explícitos */
    var messageIndex = 0;
    for (var i = 0; i < THRESHOLDS.length; i++) {
        if (score >= THRESHOLDS[i].min) {
            messageIndex = THRESHOLDS[i].index;
            break;
        }
    }
    var msg = MESSAGES[messageIndex] || MESSAGES[0];

    var scoreEl = document.getElementById("scoreValue");
    var totalEl = document.getElementById("totalQuestions");
    var titleEl = document.getElementById("resultTitle");
    var messageEl = document.getElementById("resultMessage");

    if (scoreEl) scoreEl.textContent = score;
    if (totalEl) totalEl.textContent = total;
    if (titleEl) titleEl.textContent = msg.title;
    if (messageEl) messageEl.textContent = msg.text;
})();
