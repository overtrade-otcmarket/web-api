const Paging = (page: any, limit: any) => {
  return {
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
  };
};

export default Paging;
