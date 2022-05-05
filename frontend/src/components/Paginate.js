import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvancedPostAction,
  getAllPostAction,
} from "../actions/postActions";

const useStyles = makeStyles(() => ({
  paginate: {
    "& .MuiPagination-ul": {
      padding: 4,
    },
  },
  paginationItem: {},
}));

const Paginate = ({
  pageNumber = 1,
  skills = [],
  project = false,
  freelancer = false,
  employer = false,
}) => {
  const params = useParams();
  const category = params.category || "";
  const keyword = params.keyword || "";
  const price = params.price || "";
  const experiencedLevel = params.experiencedLevel || "";
  // console.log(
  //   `${category} ---- ${experiencedLevel} ---- ${pageNumber} ---- ${price} ---- ${keyword}`
  // );

  const dispatch = useDispatch();
  const getPosts = useSelector((state) => state.getPosts);
  const { pages: postPages } = getPosts;
  const { pages: employerPages } = useSelector((state) => state.employerInfo);
  const { pages: freelancerPages } = useSelector((state) => state.talentInfo);

  const classes = useStyles();
  const page = Number(pageNumber);
  console.log(page);

  useEffect(() => {
    const searchQuery = {
      category: category,
      experiencedLevel: experiencedLevel,
      price: price,
      keyword: keyword,
      skillsRequirement: skills,
    };
    if (project) {
      if (category === "all") {
        console.log("From paginate all");
        dispatch(
          getAllPostAction({
            inputData: searchQuery,
            pageNumber: pageNumber,
          })
        );
      } else {
        console.log("From paginate advanced");
        dispatch(
          getAdvancedPostAction({
            inputData: searchQuery,
            pageNumber: pageNumber,
          })
        );
      }
    }
  }, [dispatch, pageNumber]);

  return (
    <Pagination
      className={classes.paginate}
      color="primary"
      variant="outlined"
      count={project ? postPages : freelancer ? freelancerPages : employerPages}
      defaultPage={1}
      page={page}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={
            project
              ? category && keyword && price && experiencedLevel
                ? `/projects/${category}/page/${item.page}/search/${keyword}/price/${price}/experience/${experiencedLevel}`
                : category && experiencedLevel && price
                ? `/projects/${category}/page/${item.page}/price/${price}/experience/${experiencedLevel}`
                : experiencedLevel && keyword
                ? `/projects/${category}/page/${item.page}/search/${keyword}/experience/${experiencedLevel}`
                : price && keyword
                ? `/projects/${category}/page/${item.page}/search/${keyword}/price/${price}`
                : experiencedLevel
                ? `/projects/${category}/page/${item.page}/experiencedLevel/${experiencedLevel}`
                : keyword
                ? `/projects/${category}/page/${item.page}/search/${keyword}`
                : price
                ? `/projects/${category}/page/${item.page}/price/${price}`
                : `/projects/${category}/page/${item.page}`
              : employer
              ? `/employerList/page/${item.page}`
              : `/freelancer/page/${item.page}`
          }
        />
      )}
    />
  );
};

export default Paginate;
