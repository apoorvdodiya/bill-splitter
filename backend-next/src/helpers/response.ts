export const httpResponses = {
  single: (message: string, data = null) => {
    return {
      success: true,
      message,
      data,
    };
  },
  list: (message: string, data = null) => {
    return {
      success: true,
      message,
      data,
    };
  },
};
