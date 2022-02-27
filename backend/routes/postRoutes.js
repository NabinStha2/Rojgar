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

router.post("/addProject/:id", createPost);

router.get("/projects", getAllPosts);

router.get("/projects/:id", getEmployerPosts);

router.get("/categorySearch/projects/:category", categorySearchProjects);

router.get("/advanceSearch/projects/:category", advanceSearchProjects);

router.get("/project/:id", getPost);

router.patch("/project/:id", updatePost);

router.patch("/projectPaidProposal/:id", updatePostPaidProposal);

router.patch("/projectAcceptProposal/:id", updatePostAcceptProposal);

router.patch("/projectFinishProposal/:id", updatePostFinishProposal);

router.delete("/project/:id", deletePost);

module.exports = router;
