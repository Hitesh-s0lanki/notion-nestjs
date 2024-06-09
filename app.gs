function createNotionPage(title, textContent) {
  const url = 'https://api.notion.com/v1/pages';
  const headers = {
    Authorization:
      'Bearer ' + 'secret_pKOOS8breDiKrfCcir3TCxIYupgb4RZaQbJQY8VA5LM',
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  };

  const payload = {
    parent: {
      type: 'page_id',
      page_id: 'f803ae1478d744b1a74575c8cf340f1b',
    },
    properties: {
      title: [
        {
          text: {
            content: title,
          },
        },
      ],
    },
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: 'Types of kale', // This is the text that will be displayed in Notion
              },
            },
          ],
        },
      },
    ],
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  } catch (error) {
    Logger.log('Error creating page: ' + error.message);
  }
}
