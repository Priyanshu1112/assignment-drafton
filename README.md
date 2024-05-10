# Assingment-Drafton
## Links
- [Video Tutorial](https://drive.google.com/file/d/1w0MRWyVj3JL7tIAxddZfscPTwPvxBhBN/view?usp=drive_link)
- [Visit Project](https://assignment-drafton.vercel.app/)
  
## Run the Application
For running the application you need to follow the following steps :
1. **Clone** the repository.
2. Run **npm install** to install all the dependencies.
3. Setup the environment variables by taking reference from **.env.example**.

Now, you're all set to run the application!

## Design
- ### Routes
  - The home route (`/`) contains a welcome screen and login action.
  - Authenticated users are redirected to `/dashboard`, where they have access to :
    - Creating Proposal.
    - Already Created Proposal.
    - User Settings.

- ### Components
  - All required components are stored in `src/components`.
    
- ### Actions
  - Required actions are stored in the `src/actions` folder.
  - These actions are called by the client-side and fetch data from APIs.

- ### Api
  - APIs are stored in `src/app/api`.
  - They fetch data from the database (**MongoDB**) and LLM model (**OpenAI**).
  
  
