window.onload = function () {
  // Modal
  Array.from(document.getElementsByClassName('md-trigger')).forEach(e => {
    e.addEventListener("click", function () {
      Array.from(document.getElementsByClassName('md-modal')).forEach(el => {
        el.classList.add('md-show');
      });
    }, false);
  });

  Array.from(document.getElementsByClassName('md-close')).forEach(e => {
    e.addEventListener("click", function () {
      if (document.getElementById("AdaptInput").value != "") {
        Array.from(document.getElementsByClassName('md-modal')).forEach(el => {
          el.classList.remove('md-show');
        });
      }
    }, false);
  });

  // Button
  function CreerBoutton(elemById) {
    const elemStyle = elemById.style;
    const elemBoundingClientRect = elemById.getBoundingClientRect();

    elemById.onmousemove = function (e) {
      const x = e.clientX - elemBoundingClientRect.left;
      const y = e.clientY - elemBoundingClientRect.top;
      const xc = elemBoundingClientRect.width / 2;
      const yc = elemBoundingClientRect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      elemStyle.setProperty('--rx', `${dy / -1}deg`);
      elemStyle.setProperty('--ry', `${dx / 5}deg`);
    }

    elemById.onmouseleave = function (e) {
      elemStyle.setProperty('--ty', '0');
      elemStyle.setProperty('--rx', '0');
      elemStyle.setProperty('--ry', '0');
    }

    elemById.onmousedown = function (e) {
      elemStyle.setProperty('--tz', '-25px');
    }

    elemById.onmouseup = function (e) {
      elemStyle.setProperty('--tz', '-12px');
    }
  }
  const JoinGame = document.getElementById('JoinGame');
  const JoinSpec = document.getElementById('JoinSpec');
  CreerBoutton(JoinGame);
  CreerBoutton(JoinSpec);

  // Input
  document.getElementById('AdaptInput').addEventListener("input", function () {
    let newText;
    switch (int(random(0, 5))) {
      case 0:
        newText = "Cute";
        break;
      case 1:
        newText = "Gross";
        break;
      case 2:
        newText = "Boring";
        break;
      case 3:
        newText = "Beautiful";
        break;
      case 4:
        newText = "Classic";
        break;
      default:
        newText = "Error ?!";
        break;
    }
    document.getElementById('AdaptLabel').setAttribute("placeholder", newText);
  });
}