const commonText = {
  Gettingstarted: {
    heading:
      "Get Mapping and subscription status of User's with the help of this tool",
    description:
      "When using this designated tool, administrators can quickly determine a user's mapping and subscription status. By searching for a user, if no records are found, it indicates the user has not logged into the Webex Calling Integration app within Microsoft Teams. The TAC or engineering team would then prompt the user to log in at least once. For users present in the system, the tool checks if they have an active subscription to facilitate presence updates from MS Teams to Webex. This process ensures that user access and service integrations are both up-to-date and functioning as intended, streamlining the management of user statuses within the organization.",
  },
  Theoryoftool:{
    overview:" This tool will provide you the Mapping and Subscription status of the particular user on the basis of user's Webex user Id.",
    mappingtheory:"Mapping basically here means that CAT1 flow is there i.e user is logged in MSFT pluggin.",
    subscriptiontheory:"Subscription basically here means that CAT2 flow is there i.e  user's presence works smoothly."
  }
};

export default commonText;
