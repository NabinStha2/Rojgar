const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  advanceSearchProjects,
  categorySearchProjects,
  getPost,
  getEmployerPosts,
  updatePostAcceptProposal,
  updatePostPaidProposal,
  updatePostFinishProposal,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/addProject/:id", protect, createPost);

router.get("/projects", getAllPosts);

router.get("/employerProjects/:id", protect, getEmployerPosts);

router.get("/categorySearch/projects/:category", categorySearchProjects);

router.get("/advanceSearch/projects/:category", advanceSearchProjects);

router.get("/project/:id", getPost);

router.patch("/project/:id", protect, updatePost);

router.patch("/projectPaidProposal/:id", protect, updatePostPaidProposal);

router.patch("/projectAcceptProposal/:id", protect, updatePostAcceptProposal);

router.patch("/projectFinishProposal/:id", protect, updatePostFinishProposal);

router.delete("/project/:id", protect, deletePost);

module.exports = router;
