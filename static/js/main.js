function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
function deleteTask(taskId) {
  fetch(`/delete/${taskId}/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "deleted") {
        const li = document.getElementById(`task-${taskId}`);
        if (li) li.remove(); // Remove task from DOM
      }
    })
    .catch((err) => console.error(err));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  fetch("/add/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify({ title: title }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Add new task to DOM dynamically
      const ul = document.getElementById("taskList");
      const li = document.createElement("li");
      li.textContent = data.title;
      ul.prepend(li); // newest first
      input.value = ""; // clear input
    })
    .catch((err) => console.error(err));
}
