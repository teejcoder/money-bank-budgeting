# Money Bank

**Link to project:** [Money Bank](https://moneybank.netlify.app/)

![Money Bank Screenshot](https://media.giphy.com/media/GX5tnFBYTC8k260e9I/giphy.gif)

## Project Overview:

Money Bank is a FinTech app built using JavaScript, React, Express, and Node. It leverages the Basiq API to connect and retrieve financial transaction data, providing users with a visual representation of their banking activities. The app incorporates Chart.js to create intuitive charts and graphs.

## How It Works:

### Functionality:
- Users can connect to the Basiq API by clicking the "Connect Bank" button.
- Financial transaction data fetched from the API is stored in the component's state using React's useState hook.
- The app uses an example user's Basiq ID for demonstration purposes.

### Charts:
- Chart.js is employed to visualize financial data, offering a clear representation of withdrawals and deposits.

### Data Processing:
- Financial transaction data from the Basiq API is processed to categorize and separate withdrawals and deposits.
- The processed data is then utilised to generate informative charts and graphs.

### User Interaction:
- The "Connect Bank" button initiates the process of fetching financial transaction data.
- Upon successful retrieval, the app dynamically displays the total bank transactions.

## Optimisations:

- Introduction of a profile page for users to update their data.
- Implementation of a privacy policy and terms of service
- Accurate data retrieval with real-time financial information by creating Basiq User with each user.

## Lessons Learned:

### 1. Importance of Comprehensive Planning:
   - Realized the significance of thorough project planning, including defining clear objectives, user stories, and architectural considerations. This helps in avoiding potential roadblocks during the development process.

### 2. User-Centric Design:
   - Recognised the importance of prioritising user experience. Incorporating user feedback and iteratively improving the user interface ensures a more intuitive and satisfying application for end-users.

### 3. Handling External APIs:
   - Faced challenges and gained insights into efficiently integrating and working with external APIs. Understanding API documentation thoroughly and handling potential errors became a key part of the development process.

### 4. Importance of Documentation:
   - Appreciated the role of comprehensive documentation in easing future development, maintenance, and onboarding processes. Well-documented code and project information enhance overall project sustainability.

### 5. Staying Adaptable:
   - Acknowledged the dynamic nature of software development. Staying adaptable to changing requirements and embracing new technologies ensures resilience in the face of evolving project needs.
