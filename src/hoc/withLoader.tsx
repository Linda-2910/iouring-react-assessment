import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";

const withLoader = (WrappedComponent: React.ComponentType<any>) => {
  return function LoaderHOC({ loading, data, ...props }: any) {
    if (loading) {
      return (
        <Box
          mt={10}
          mb={10}
          p={2}
          sx={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          {[...Array(4)].map((_, i) => (
            <Box key={i} mb={3} p={2} sx={{ borderRadius: 2 }}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="90%" height={25} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={120}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          ))}
        </Box>
      );
    }

    if (!loading && (!data || data.length === 0)) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <Typography variant="h6" color="text.secondary">
            No records found
          </Typography>
        </Box>
      );
    }

    return <WrappedComponent data={data} {...props} />;
  };
};

export default withLoader;
