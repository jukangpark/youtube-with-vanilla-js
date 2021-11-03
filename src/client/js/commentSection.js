const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, data) => {
  const { newCommentId, owner, avatarUrl } = data;
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-user";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const icon2 = document.createElement("i");
  icon2.className = "fas fa-trash-alt";

  let avatar = null;
  if (avatarUrl) {
    avatar = document.createElement("img");
    avatar.crossOrigin = "";
    avatar.src =
      /^https?:\/\//.test(avatarUrl) || /^data:image/.test(avatarUrl)
        ? avatarUrl
        : `/${avatarUrl}`;
  } else {
    avatar = document.createElement("div");
    const avatarIcon = document.createElement("1");
    avatarIcon.classList.add("fas");
    avatarIcon.classList.add("fa-user");
    avatarIcon.classList.add("avatarIcon");
    avatar.appendChild(avatarIcon);
  }
  avatar.className = "comment_avatar";

  newComment.appendChild(icon);
  newComment.appendChild(avatar);
  newComment.appendChild(span);
  newComment.appendChild(icon2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const data = await response.json();
    addComment(text, data);
    textarea.value = "";
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
