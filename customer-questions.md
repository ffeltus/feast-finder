>Question 1: Hello,
>
>I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
>
>Records
>Indexing
>I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."
>
>Cheers, George


Hello George

Thanks for your question, and I am very happy you have chosen to get started with Algolia. Please have a look at our easy to use onboarding tutorials here:
https://www.algolia.com/doc/onboarding/

Records:

Records will include your business information that you want your users to search on when interacting with your web site. Consider carefully which information you want to make searchable - you can then send this data to Algolia to create a search experience.

From a technical perspective, an Algolia record is a collection of attributes where each attribute has a name and a value (a key-value pair). 

This and much more is explained in the documentation at the following link:
https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/

Indexing:

An index is a collection of records. As mentioned, Algolia will search through any set of data, as long as it’s structured. The items are broken down into individual records (objects), with each object containing a set of fields (attributes). 
Having clarified what an index is, indexing refers to the process of adding, updating, or deleting records in an index.

Custom Ranking:

Custom Ranking allows you to influence the relevance of search results by specifying attributes that should be considered more important when ranking search results. These attributes can help ensure that the most relevant items are presented to users based on their search queries.

Typical custom ranking attribute metrics include number of sales, views, likes, ratings, release date, etc. Any boolean or numeric attribute works with custom ranking. This kind of control over ranking lets you achieve many business goals: showcase your product line, encourage people to stay on your site and view as many products as possible, increase sales, and many more. 

There is a really well explained article in our documentation here: https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/

I hope this helps, please let me know if you have any further questions.

Many thanks,
Fritz

---
  
>Question 2: Hello,
>
>Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.
>
>Regards, Matt

Hi Matt

I'm very sorry to hear that you're unhappy with the new dashboard. I will take your feedback onboard and let the developers know that there are now additional clicks required for this simple workflow. In the meantime, I would recommend you create a simple script which allows you to perform these tasks easily with a couple of lines of code:

```from algoliasearch.search_client import SearchClient
# Initialize Algolia client
client = SearchClient.create('YourApplicationID', 'YourAdminAPIKey')
index = client.init_index('your_index_name')

# Clear and/or delete the index
index.clear_objects()
index.delete()
```

I hope this helps, please let me know if I can do anything else to help in the meantime.

Many thanks,
Fritz

---

>Question 3: Hi,
>
>I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?
>
>Regards, Leo

Hello Leo,

Integrating Algolia into your website will be a very manageable task as we provide a host of onboarding, getting started tutorials and check-lists for development. We are renowned for our ease of use and seamless integration, as is evidenced by our inclusion as a leader in the new 2024 Gartner Magic Quadrant for Search and Product Discovery. See more information about the reasons for our leadership here: https://www.algolia.com/about/news/algolia-named-a-leader-in-2024-gartner-magic-quadranttm-for-search-and-product-discovery/

To get a quick start with your integration project: https://www.algolia.com/doc/guides/getting-started/quick-start/
This will show you how to how to set up an account, and get you going with a tutorial, understanding the basics very quickly.

For simplified development, we have a vanilla JavaScript library that lets you create an instant search results experience using Algolia’s search API.
https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/#welcome-to-instantsearchjs

You can also have a look at the integration guides, which show you how to integrate with popular platforms Shopify, Magento 2, Netlify, or Salesforce.

You can see the high level process for integrating Algolia into your web site in our integration checklist here:
https://www.algolia.com/doc/guides/going-to-production/implementation-checklist/

I hope this helps, I'm here to help if there are any follow up questions.

Many thanks,
Fritz
