const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const video = document.querySelector(".video");
let deleteBtns = document.querySelectorAll(".commentDelete");

const addComment = (text, data) => {
  const { newCommentId, owner, avatarUrl } = data;
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.commentId = newCommentId;
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const icon2 = document.createElement("i");

  icon2.classList.add("fas");
  icon2.classList.add("fa-times");
  icon2.classList.add("commentDelete");

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
    const avatarIcon = document.createElement("i");
    avatarIcon.classList.add("fas");
    avatarIcon.classList.add("fa-user");
    avatarIcon.classList.add("avatarIcon");
    avatar.appendChild(avatarIcon);
  }
  avatar.className = "comment_avatar";
  const ownerContainer = document.createElement("div");
  ownerContainer.className = "ownerContainer";
  const ownerSpan = document.createElement("span");
  ownerSpan.className = "owner__name";
  ownerSpan.innerText = `${owner}`;

  newComment.prepend(ownerContainer);
  ownerContainer.appendChild(avatar);
  ownerContainer.appendChild(ownerSpan);
  newComment.appendChild(span);
  newComment.appendChild(icon2);
  videoComments.prepend(newComment);

  deleteBtns = document.querySelectorAll(".commentDelete");
  deleteBtnsListener();
};

const deleteBtnsListener = () => {
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", deleteComment)
  );
};

const deleteComment = async (event) => {
  const comment = event.currentTarget.parentElement;
  const { videoId } = video.dataset;
  const { commentId } = comment.dataset;

  const response = await fetch(
    `/api/videos/${videoId}/comments/${commentId}/delete`,
    {
      method: "DELETE",
    }
  );

  const { url, redirected, status } = response;

  if (redirected) {
    return (window.location.href = url);
  }

  if (status === 200) {
    comment.remove();
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const { videoId } = video.dataset;
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
  const { url, redirected, status } = response;
  if (redirected) {
    return (window.location.href = url);
  }

  if (status === 201) {
    textarea.value = "";
    const data = await response.json();
    addComment(text, data);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteBtnsListener();
