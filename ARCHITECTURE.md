# Cipher.AI - Architecture & Project Structure

## Overview
Cipher.AI is a real-time AI rap battle platform where users test their lyrical skills against an adaptive neural network. The platform uses WebSockets for low-latency communication and OpenAI for intelligent rap generation.

## Project Structure

```
cipher-ai-rap-battle/
├── frontend/                    # Next.js React app
│   ├── pages/
│   │   ├── _app.tsx            # App wrapper
│   │   ├── index.tsx           # Homepage
│   │   ├── battle/
│   │   │   └── [id].tsx        # Battle arena page
│   │   ├── leaderboard.tsx     # Global rankings
│   │   └── profile/
│   │       └── [username].tsx  # User profiles
│   ├── components/
│   │   ├── BattleArena.tsx     # Main battle interface
│   │   ├── VerseInput.tsx      # Text input for user bars
│   │   ├── AIResponse.tsx      # Display AI bars
│   │   ├── HypeMeter.tsx       # Live voting display
│   │   ├── Timer.tsx           # 30-second timer
│   │   └── Navbar.tsx          # Navigation
│   ├── hooks/
│   │   ├── useWebSocket.ts     # WebSocket connection
│   │   ├── useBattle.ts        # Battle state management
│   │   └── useAuth.ts          # Authentication
│   ├── styles/
│   │   └── globals.css         # Tailwind CSS
│   └── package.json
│
├── backend/                     # Node.js Express server
│   ├── server.js               # Main entry point
│   ├── routes/
│   │   ├── battles.js          # Battle endpoints
│   │   ├── leaderboard.js      # Rankings endpoints
│   │   └── users.js            # User endpoints
│   ├── services/
│   │   ├── battleService.js    # Battle logic
│   │   ├── aiService.js        # OpenAI integration
│   │   ├── socketService.js    # WebSocket handlers
│   │   └── rapPromptBuilder.js # Rap prompt generation
│   ├── models/
│   │   ├── Battle.js           # Battle data model
│   │   ├── User.js             # User data model
│   │   └── Verse.js            # Verse model
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── config/
│   │   └── database.js         # DB connection
│   ├── utils/
│   │   ├── scoring.js          # Battle scoring logic
│   │   └── validators.js       # Input validation
│   └── package.json
│
└── README.md

```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- - **Styling**: Tailwind CSS
  - - **State Management**: React Context + Hooks
    - - **Real-time Communication**: Socket.io Client
      - - **API Client**: Axios
        - - **Authentication**: JWT Tokens
         
          - ### Backend
          - - **Runtime**: Node.js (v18+)
            - - **Framework**: Express.js
              - - **Real-time**: Socket.io
                - - **Database**: Supabase PostgreSQL
                  - - **AI**: OpenAI GPT-4
                    - - **Authentication**: JWT (jsonwebtoken)
                      - - **Validation**: Joi
                       
                        - ### DevOps & Infrastructure
                        - - **Frontend Deployment**: Vercel
                          - - **Backend Deployment**: Railway or Render
                            - - **Database**: Supabase
                              - - **Real-time DB**: Redis (for leaderboard cache)
                                - - **Monitoring**: Sentry
                                 
                                  - ## Core Features
                                 
                                  - ### 1. Battle Arena
                                  - - Real-time 1v1 battles against AI
                                    - - 30-second timer per verse
                                      - - 4-bar limit per turn
                                        - - Audio and text input support
                                          - - Live voting ("hype meter")
                                           
                                            - ### 2. AI Opponent
                                            - - Uses OpenAI GPT-4 for rap generation
                                              - - Learns user's style and weaknesses
                                                - - Personalizes roasts based on user history
                                                  - - Maintains rap battle context
                                                    - - Generates competitive punchlines in real-time
                                                     
                                                      - ### 3. Scoring System
                                                      - - Base score: 0-100 points per verse
                                                        - - Criteria:
                                                          -   - Rhyme scheme (25 points)
                                                              -   - Wordplay & metaphors (25 points)
                                                                  -   - Flow & rhythm (25 points)
                                                                      -   - Crowd reaction (25 points)
                                                                          - - Real-time crowd voting via Hype Meter
                                                                           
                                                                            - ### 4. Leaderboard
                                                                            - - Global rankings by total wins
                                                                              - - Monthly ranked battles
                                                                                - - Trending battles
                                                                                  - - Win streaks
                                                                                    - - User profiles with stats
                                                                                     
                                                                                      - ### 5. User System
                                                                                      - - Sign-up/Login with JWT
                                                                                        - - User profiles with customizable avatars
                                                                                          - - Battle history
                                                                                            - - Personal stats
                                                                                              - - Follow/friend system
                                                                                               
                                                                                                - ## WebSocket Events
                                                                                               
                                                                                                - ### Battle Flow
                                                                                                - ```
                                                                                                  Client                          Server
                                                                                                    |-- join_battle() ----------->|
                                                                                                    |<---------- battle_ready ----|
                                                                                                    |-- submit_verse() ---------->|
                                                                                                    |<---------- ai_thinking ------|
                                                                                                    |<---------- ai_verse ---------|
                                                                                                    |-- vote() ------------------>|
                                                                                                    |<---------- hype_update ------|
                                                                                                    |<---------- round_end --------|
                                                                                                    |-- next_round() or exit ---->|
                                                                                                  ```

                                                                                                  ### Event Types
                                                                                                  - `join_battle`: Join a battle room
                                                                                                  - - `submit_verse`: Send user's rap bars
                                                                                                    - - `ai_thinking`: AI is generating response
                                                                                                      - - `ai_verse`: AI rap generated
                                                                                                        - - `vote`: User votes on a verse
                                                                                                          - - `hype_update`: Hype meter updated
                                                                                                            - - `battle_end`: Battle concluded
                                                                                                              - - `leaderboard_update`: Rankings updated
                                                                                                               
                                                                                                                - ## OpenAI Integration
                                                                                                               
                                                                                                                - ### Rap Prompt Template
                                                                                                                - ```
                                                                                                                  You are a legendary rap battle MC. Generate a response verse with:
                                                                                                                  - 4 bars exactly
                                                                                                                  - Rhyming couplets (AABB pattern)
                                                                                                                  - Wordplay and metaphors
                                                                                                                  - Personalized roasts based on opponent's bars
                                                                                                                  - Competitive and witty punchlines
                                                                                                                  - Maintain battle context and escalation

                                                                                                                  User bars: "{userBars}"
                                                                                                                  User profile: "{userProfile}"
                                                                                                                  Battle history: "{battleContext}"

                                                                                                                  Generate the AI response verse:
                                                                                                                  ```
                                                                                                                  
                                                                                                                  ### Response Processing
                                                                                                                  - Parse AI response for quality
                                                                                                                  - - Cache popular bars to prevent repetition
                                                                                                                    - - Track battle context for coherence
                                                                                                                      - - Generate variations if needed
                                                                                                                       
                                                                                                                        - ## Authentication Flow
                                                                                                                       
                                                                                                                        - ```
                                                                                                                          Sign Up / Login
                                                                                                                            ↓
                                                                                                                          Verify Credentials (Supabase Auth)
                                                                                                                            ↓
                                                                                                                          Generate JWT Token
                                                                                                                            ↓
                                                                                                                          Return Token + User Data
                                                                                                                            ↓
                                                                                                                          Store JWT in localStorage
                                                                                                                            ↓
                                                                                                                          Attach JWT to all API requests
                                                                                                                            ↓
                                                                                                                          WebSocket auto-authenticates with JWT
                                                                                                                          ```
                                                                                                                          
                                                                                                                          ## Battle Logic
                                                                                                                          
                                                                                                                          ### 1. Initialization
                                                                                                                          - 2 players (1 human, 1 AI)
                                                                                                                          - - Random first speaker
                                                                                                                            - - 10 rounds per battle
                                                                                                                              - - 30 seconds per verse
                                                                                                                               
                                                                                                                                - ### 2. Each Round
                                                                                                                                - - Player 1 submits verse (4 bars)
                                                                                                                                  - - AI generates response
                                                                                                                                    - - Crowd votes (live hype meter)
                                                                                                                                      - - Points awarded
                                                                                                                                        - - Next round
                                                                                                                                         
                                                                                                                                          - ### 3. Scoring
                                                                                                                                          - - Verses scored 0-100
                                                                                                                                            - - Based on: rhyme, wordplay, flow, crowd reaction
                                                                                                                                              - - Running total for each player
                                                                                                                                                - - Battle ends after 10 rounds
                                                                                                                                                 
                                                                                                                                                  - ### 4. Winner Determination
                                                                                                                                                  - - Highest total score wins
                                                                                                                                                    - - Leaderboard updated
                                                                                                                                                      - - Stats recorded
                                                                                                                                                        - - Badges/achievements awarded
                                                                                                                                                         
                                                                                                                                                          - ## Environment Variables
                                                                                                                                                         
                                                                                                                                                          - ```
                                                                                                                                                            # Frontend (.env.local)
                                                                                                                                                            NEXT_PUBLIC_API_URL=http://localhost:3001
                                                                                                                                                            NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
                                                                                                                                                            NEXT_PUBLIC_SUPABASE_URL=
                                                                                                                                                            NEXT_PUBLIC_SUPABASE_ANON_KEY=

                                                                                                                                                            # Backend (.env)
                                                                                                                                                            NODE_ENV=development
                                                                                                                                                            PORT=3001
                                                                                                                                                            DATABASE_URL=postgresql://...
                                                                                                                                                            OPENAI_API_KEY=sk-...
                                                                                                                                                            JWT_SECRET=your-secret-key
                                                                                                                                                            REDIS_URL=redis://...
                                                                                                                                                            SOCKET_PORT=3001
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ## Development Setup
                                                                                                                                                            
                                                                                                                                                            ### Frontend
                                                                                                                                                            ```bash
                                                                                                                                                            cd frontend
                                                                                                                                                            npm install
                                                                                                                                                            npm run dev
                                                                                                                                                            # Runs on http://localhost:3000
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Backend
                                                                                                                                                            ```bash
                                                                                                                                                            cd backend
                                                                                                                                                            npm install
                                                                                                                                                            npm run dev
                                                                                                                                                            # Runs on http://localhost:3001
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Both (from root)
                                                                                                                                                            ```bash
                                                                                                                                                            npm run dev  # Concurrently runs both
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ## Deployment
                                                                                                                                                            
                                                                                                                                                            ### Vercel (Frontend)
                                                                                                                                                            ```bash
                                                                                                                                                            vercel deploy
                                                                                                                                                            # Auto-deploys on git push
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Railway (Backend)
                                                                                                                                                            ```bash
                                                                                                                                                            railway deploy
                                                                                                                                                            # Auto-deploys on git push
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Database (Supabase)
                                                                                                                                                            - Auto-backups
                                                                                                                                                            - - Real-time subscriptions
                                                                                                                                                              - - Built-in authentication
                                                                                                                                                               
                                                                                                                                                                - ## Performance Optimization
                                                                                                                                                               
                                                                                                                                                                - 1. **Low-Latency**
                                                                                                                                                                  2.    - WebSocket for real-time updates
                                                                                                                                                                        -    - Server-side caching of AI responses
                                                                                                                                                                             -    - CDN for static assets
                                                                                                                                                                              
                                                                                                                                                                                  - 2. **Scalability**
                                                                                                                                                                                    3.    - Redis for leaderboard cache
                                                                                                                                                                                          -    - Horizontal scaling with multiple workers
                                                                                                                                                                                               -    - Database query optimization
                                                                                                                                                                                                
                                                                                                                                                                                                    - 3. **AI Optimization**
                                                                                                                                                                                                      4.    - Prompt caching to reduce API calls
                                                                                                                                                                                                            -    - Response time < 2 seconds
                                                                                                                                                                                                                 -    - Fallback responses if API slow
                                                                                                                                                                                                                  
                                                                                                                                                                                                                      - ## Security Considerations
                                                                                                                                                                                                                  
                                                                                                                                                                                                                      - 1. **Authentication**: JWT with refresh tokens
                                                                                                                                                                                                                        2. 2. **Rate Limiting**: Prevent API abuse
                                                                                                                                                                                                                           3. 3. **Input Validation**: Sanitize all user inputs
                                                                                                                                                                                                                              4. 4. **CORS**: Restrict cross-origin requests
                                                                                                                                                                                                                                 5. 5. **HTTPS**: All connections encrypted
                                                                                                                                                                                                                                    6. 6. **XSS Protection**: React auto-escaping
                                                                                                                                                                                                                                       7. 7. **CSRF Protection**: Token validation
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                          8. ## Future Features
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                          9. - Voice input/output with speech synthesis
                                                                                                                                                                                                                                             - - Battle tournament mode
                                                                                                                                                                                                                                               - - Team battles (2v2)
                                                                                                                                                                                                                                                 - - Custom AI personalities
                                                                                                                                                                                                                                                   - - Multiplayer spectating
                                                                                                                                                                                                                                                     - - Recorded battles on blockchain
                                                                                                                                                                                                                                                       - - NFT badges & achievements
                                                                                                                                                                                                                                                         - - Prize pools for ranked battles
                                                                                                                                                                                                                                                           - - Mobile app (React Native)
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                             - ## Monitoring & Analytics
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                             - - User engagement metrics
                                                                                                                                                                                                                                                               - - Battle completion rates
                                                                                                                                                                                                                                                                 - - AI response quality scores
                                                                                                                                                                                                                                                                   - - Leaderboard trends
                                                                                                                                                                                                                                                                     - - Error logging (Sentry)
                                                                                                                                                                                                                                                                       - - Performance monitoring (New Relic)
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                         - ## Contributing
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                         - Follow the branch naming convention:
                                                                                                                                                                                                                                                                         - - `feature/` for new features
                                                                                                                                                                                                                                                                           - - `fix/` for bug fixes
                                                                                                                                                                                                                                                                             - - `refactor/` for code improvements
                                                                                                                                                                                                                                                                               - - `docs/` for documentation
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                 - All PRs require code review and tests pass before merge.
                                                                                                                                                                                                                                                                                 - 
