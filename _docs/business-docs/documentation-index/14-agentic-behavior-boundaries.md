# Agentic Behavior & Boundaries Guide
## What Agents Do, What They Never Do, How Memory Works, How Authors Retain Control

**Purpose**: Build trust through transparency. Clear articulation of what AI agents do, what they never do, how memory works, how authors retain control, and how errors are handled.

**Audience**: Authors, internal, legal (future reference)

**Status**: Foundational Document - MVP-Complete / Pre-Scale

---

## Core Principle: Human Agency and Control

**Commitment**: Humans maintain final authority and control over all content and decisions. AI supports human decision-making, never replaces it. All AI output is subject to human review and approval.

**The 70/30 Rule**: AI handles approximately 70% of the logistics and repetitive work. Humans provide 30% of the creative direction, voice, theology, and final decisions. This ratio ensures efficiency without compromising authenticity or control.

---

## What AI Agents Do

### Content Creation & Repurposing

**AI agents assist with**:
- **Content Repurposing**: Transform sermons into articles, talks into series, emails into blog posts
- **Draft Generation**: Create initial drafts based on your content, voice, and style
- **Editing & Polish**: Improve clarity, flow, and structure while preserving your voice
- **Format Conversion**: Transform content into different formats (article → newsletter → social posts)

**How it works**:
- **Voice & Vocation Coach** analyzes voice coherence against 5 key markers
- **SEO Expert** provides optimization suggestions and scoring
- **Related Content** agent discovers related articles, books, and resources
- **Formation Companion** and **Contextual Companion** provide context-aware assistance
- AI agents are trained on your existing content to learn your voice, style, and theological positions
- They use movemental theology frameworks to ensure theological alignment
- Voice preservation via `voice_baselines` table with voice fingerprinting
- All output is subject to your review, editing, and approval
- You maintain full editorial control at every step

### SEO & Discovery Optimization

**AI agents assist with**:
- **SEO Optimization**: Suggest keywords, meta descriptions, and optimization strategies
- **Headline Generation**: Create multiple headline options for your review and selection
- **Content Structuring**: Optimize article structure for search and readability
- **Keyword Research**: Identify relevant keywords based on your content and audience

**How it works**:
- AI suggests optimizations, but you approve all changes
- SEO recommendations align with your voice and message
- You can accept, modify, or reject any suggestion
- Final SEO decisions are yours

### Content Ideas & Strategy

**AI agents assist with**:
- **Content Ideas**: Suggest topics based on your expertise, audience, and trending themes
- **Editorial Calendar**: Help plan publishing schedules and content mix
- **Trend Analysis**: Identify relevant trends and opportunities
- **Audience Insights**: Analyze engagement patterns and suggest content strategies

**How it works**:
- AI provides suggestions, not mandates
- You choose what to pursue and when
- Strategy decisions remain yours
- AI supports your strategic thinking, doesn't replace it

### Analytics & Insights

**AI agents assist with**:
- **Performance Analysis**: Identify top-performing content and patterns
- **Audience Insights**: Analyze engagement, growth, and behavior patterns
- **Optimization Suggestions**: Recommend improvements based on data
- **Trend Identification**: Spot opportunities and emerging patterns

**How it works**:
- AI provides insights and recommendations
- You interpret the data and make strategic decisions
- AI supports your decision-making with data, not replaces your judgment

---

## AI Agent Inventory

**Total Agents**: 22 specialized AI agents implemented (verified December 2025)

The platform includes 22 specialized AI agents, each designed for specific tasks and capabilities:

1. **Voice & Vocation Coach** - ✅ Production-ready
   - Voice alignment and coherence analysis
   - Theological accuracy verification
   - Vocational guidance for ministry leaders
   - 5 key voice markers: prophetic intensity, pastoral warmth, scholarly depth, visionary scope, apostolic authority

2. **AI Lab Agent** - ✅ Complete (needs UI polish)
   - Personal movemental theology research assistant
   - Access to Alan Hirsch corpus via vector store
   - Conversation persistence
   - Theme configuration (mdna, apest, formation, missional, movemental)

3. **Formation Companion** - ✅ Complete (needs prompting fine-tuning)
   - Personalized formation guidance based on assessment results
   - Context-aware responses using Unified Movemental Profile
   - Course progress awareness

4. **Contextual Companion** - ✅ Complete (needs prompting fine-tuning)
   - Unified agent for books, articles, courses, assessments
   - Context-aware responses across all content types
   - Unified Movemental Profile integration

5. **mDNA Assessment Agent** - ✅ Complete (needs prompting fine-tuning)
   - Voice and text assessment support
   - Assessment result analysis and interpretation
   - Personalized recommendations

6. **Archive Explorer** - ✅ Complete
   - Archive research and citation
   - Historical content discovery

7. **SEO Expert** - ✅ Complete
   - SEO optimization with scoring system
   - Keyword research and suggestions
   - Readability analysis
   - Schema markup generation

8. **Related Content** - ✅ Complete
   - Content discovery and cross-referencing
   - Semantic content search
   - Related content suggestions

9. **Sermon Shaper** - ✅ Complete
   - Multi-agent sermon preparation system
   - Coordinates 9 specialized sub-agents
   - Comprehensive sermon preparation workflow

10. **Metadata Generator** - ✅ Complete
11. **Schema Generator** - ✅ Complete
12. **Content Structure** - ✅ Complete
13. **Orchestrator** - ✅ Complete (coordinates multiple agents)
14. **Theological Integrity** - ✅ Complete
15. **Voice Authenticity** - ✅ Complete
16. **Article Companion** - ✅ Complete
17. **Book Reading** - ✅ Complete
18. **Assessment Interpreter** - ✅ Complete
19. **Course Companion** - ✅ Complete
20. **Formation Coach** - ✅ Complete
21. **Chat Coaches** - ✅ Complete
22. **Translator** - ✅ Complete

**Agent Architecture**:
- Tool-based architecture using OpenAI Agents SDK
- Each agent has defined tools and instructions
- Context management via unified context engine
- Persistent conversation history and memory
- Agent metrics and performance tracking

For detailed implementation status of all agents, see [28-implementation-status.md](28-implementation-status.md).

---

## What AI Agents Never Do

### They Never Publish Without Approval

**Boundary**: AI agents cannot publish content automatically. All content requires your explicit approval before publication.

**Implementation**:
- All AI-generated content goes through your review process
- You must explicitly approve content before it's published
- No automated publishing workflows exist
- All published content reflects your final decisions

### They Never Replace Your Voice

**Boundary**: AI agents preserve and amplify your voice, never homogenize or replace it.

**Implementation**:
- **Voice Baseline System**: Voice stored in `voice_baselines` table with content samples and voice fingerprint
- **Voice & Vocation Coach**: Analyzes voice coherence against 5 key markers (prophetic intensity, pastoral warmth, scholarly depth, visionary scope, apostolic authority)
- **Voice Authenticity Agent**: Verifies voice consistency across content
- AI agents are trained on your specific voice, style, and content
- Voice consistency checks ensure your voice is maintained
- You can reject any content that doesn't sound like you
- Your authentic voice is non-negotiable

### They Never Compromise Theological Integrity

**Boundary**: AI agents must align with movemental theology and your theological positions. They cannot introduce theological content that conflicts with your beliefs or movemental values.

**Implementation**:
- **Theological Integrity Agent**: Checks theological accuracy
- **Voice & Vocation Coach**: Verifies Christocentric anchoring
- **Canonical Corpus Comparison**: Agents compare against Alan Hirsch corpus via vector store
- AI agents are trained on movemental theology frameworks
- Theological integrity checks verify alignment
- You review all content for theological accuracy
- Theological positions are clearly defined and protected

### They Never Make Strategic Decisions

**Boundary**: AI agents provide suggestions and support, but all strategic decisions are yours.

**Implementation**:
- Content strategy decisions are yours
- Publishing timing and cadence are yours
- Audience engagement approaches are yours
- Revenue and monetization decisions are yours

### They Never Access Unauthorized Information

**Boundary**: AI agents only access information you explicitly authorize. They cannot access your private data, other authors' content, or unauthorized sources.

**Implementation**:
- AI agents access only your content and authorized sources
- Private data is protected and isolated
- Cross-author access requires explicit permission
- Data privacy is maintained at all times

### They Never Provide Pastoral Care or Counseling

**Boundary**: AI agents provide educational and practical guidance, not pastoral care, counseling, or personal advice.

**Implementation**:
- Clear boundaries on appropriate AI usage
- Pastoral care and counseling require human interaction
- Crisis situations are referred to appropriate human resources
- Professional limitations are clearly communicated

---

## How Memory Works

### Author-Specific Memory

**What AI remembers about you**:
- Your voice, style, and communication patterns
- Your theological positions and movemental framework
- Your content preferences and publishing patterns
- Your audience and engagement patterns
- Your strategic goals and priorities

**How it's stored**:
- **Voice Baseline**: Stored in `voice_baselines` table with content samples and voice fingerprint
- **Content Corpus**: Vector store contains your corpus for semantic search
- **Training Data**: Content samples used for voice training
- **User Memory**: Persistent user-specific memory via `user_memory` table
- **Context Snapshots**: `context_snapshots` table for storing context at specific points

**How it's used**:
- AI agents reference your voice profile when generating content
- Voice coherence analysis compares content against your voice baseline
- Content suggestions align with your preferences
- Strategies reflect your goals and patterns
- Context engine assembles unified profile for personalized responses
- All memory use serves to improve support for you

### Network-Level Memory (Opt-In)

**What AI remembers about the network**:
- Network-wide patterns and trends (aggregated, anonymized)
- Successful content strategies across the network
- Cross-author collaboration opportunities
- Network-level insights and recommendations

**How it's stored**:
- **Network Amplification**: `network_amplification_score` field tracks network effects
- **Cross-References**: `cross_reference_count` field tracks content connections
- Aggregated and anonymized data only
- Individual author data protected and isolated
- Network insights derived from patterns, not individual content
- Opt-in participation only

**How it's used**:
- Network insights inform suggestions (with your approval)
- Collaboration opportunities identified (with your approval)
- Best practices shared (with your approval)
- Network amplification scoring for content discovery
- All network memory use is transparent and optional

### Memory Updates & Control

**You control your memory**:
- You can review what AI remembers about you
- You can update your voice profile and preferences
- You can clear or modify memory as needed
- You control what network-level insights you participate in

**Memory accuracy**:
- Memory is updated based on your feedback
- Incorrect assumptions are corrected
- Voice profiles refined based on your review
- Continuous improvement through your input

---

## How Authors Retain Control

### Editorial Control

**At Every Step**:
- You review all AI-generated content before publication
- You can edit, modify, or reject any AI suggestion
- You maintain final approval authority
- No content is published without your explicit approval

**Workflow Design**:
- AI suggests, you decide
- AI drafts, you refine
- AI optimizes, you approve
- AI supports, you lead

### Voice Control

**Voice Preservation**:
- AI learns your voice from your existing content
- Voice consistency checks ensure your voice is maintained
- You can reject any content that doesn't sound like you
- Your voice is non-negotiable and protected

**Voice Training**:
- You provide feedback on voice accuracy
- AI adjusts based on your corrections
- Voice profiles are continuously refined
- You control how your voice is represented

### Strategic Control

**Decision-Making Authority**:
- Content strategy decisions are yours
- Publishing timing and cadence are yours
- Audience engagement approaches are yours
- Revenue and monetization decisions are yours

**AI Support Role**:
- AI provides suggestions and data
- You make strategic decisions
- AI supports your thinking, doesn't replace it
- Your vision and goals drive strategy

### Transparency Control

**You Control Disclosure**:
- You decide how much to disclose about AI usage
- You control transparency settings
- You choose how to communicate AI assistance
- Your transparency approach reflects your values

**Honest Representation**:
- Movemental values transparency about AI usage
- You can be transparent about AI assistance
- You control how and when to disclose
- Transparency builds trust and credibility

---

## How Errors Are Handled

### Error Prevention

**Proactive Measures**:
- **Automated Validation**: Systematic checks for common errors and inconsistencies
- **Human Review Process**: Regular human validation of AI agent responses and recommendations
- **Quality Assurance**: Multiple layers of review before content reaches you
- **Training Refinement**: Continuous improvement based on feedback and errors

### Error Detection

**How Errors Are Identified**:
- **Author Feedback**: You identify errors during review
- **Automated Checks**: System detects inconsistencies or issues
- **Peer Review**: Network members may notice issues
- **Analytics Monitoring**: Unusual patterns indicate potential errors

### Error Correction

**Correction Process**:
- **Immediate Correction**: Errors are corrected as soon as identified
- **Feedback Integration**: Your corrections improve AI training
- **System Updates**: Corrections prevent similar errors in the future
- **Documentation**: Errors are documented to prevent recurrence

### Error Types & Responses

**Voice/Accuracy Errors**:
- Immediate correction with your feedback
- Voice profile updated to prevent recurrence
- Content revised to match your voice
- Training data updated

**Theological Errors**:
- Immediate correction with your review
- Theological frameworks refined
- Content revised to ensure accuracy
- Training data updated

**Technical Errors**:
- Immediate technical correction
- System fixes applied
- Processes improved to prevent recurrence
- Documentation updated

**Strategic Errors**:
- Discussion and clarification
- Strategy adjustments based on your input
- Decision-making process refined
- Your strategic control reinforced

---

## The 70/30 Rule in Practice

### What AI Handles (70%)

**Logistics & Repetitive Work**:
- Draft generation from existing content
- Format conversions (sermon → article)
- SEO optimization suggestions
- Content structuring and organization
- Analytics analysis and insights
- Trend identification and research

**Why This Works**:
- AI excels at repetitive, pattern-based work
- Frees you to focus on creative direction
- Maintains efficiency without compromising control
- Handles time-consuming tasks effectively

### What You Handle (30%)

**Creative Direction & Final Decisions**:
- Voice, style, and authentic expression
- Theological positions and accuracy
- Strategic decisions and priorities
- Final content approval and publishing
- Audience engagement and relationships
- Revenue and monetization decisions

**Why This Matters**:
- Your voice and vision are irreplaceable
- Theological accuracy requires your expertise
- Strategic decisions reflect your calling
- Final control ensures authenticity
- Relationships require human connection

---

## Transparency & Disclosure

### Movemental's Commitment

**Transparency Values**:
- Honest disclosure about AI usage builds trust
- Transparency is foundational to credibility
- Movemental leaders should clearly disclose AI usage
- Transparency reflects movemental values

### Your Control

**You Decide**:
- How much to disclose about AI usage
- When and how to communicate AI assistance
- Transparency settings and preferences
- Disclosure approach that reflects your values

### Best Practices

**Recommended Approaches**:
- Be transparent about AI assistance when relevant
- Disclose AI usage when it impacts credibility questions
- Use transparency to build trust, not hide assistance
- Balance transparency with audience expectations

---

## Trust & Relationship

### Building Trust Through Boundaries

**Clear Boundaries Build Trust**:
- Knowing what AI does and doesn't do creates confidence
- Understanding control mechanisms builds trust
- Transparent processes foster relationship
- Consistent boundaries create reliability

### Maintaining Relationship

**Human Connection Preserved**:
- AI supports, doesn't replace human relationships
- Your voice and personality remain central
- Authentic connection with audience maintained
- Human expertise and insight valued

---

## Agent Architecture

**Framework**: OpenAI Agents SDK (`@openai/agents`) for structured implementations

**Architecture**:
- **Tool-Based System**: Each agent has defined tools in `tools.ts` files
- **Instructions**: Agent-specific instructions in `instructions.ts` files
- **Context Management**: Context assembly via `src/lib/context-engine/packet-assembler.ts`
- **Memory**: Persistent conversation history via `agent_instances` and `ai_lab_conversations` tables
- **Metrics**: Agent performance tracking via `agent_metrics`, `agent_traces`, `agent_interactions` tables

**Agent Orchestration**:
- **Single Agent**: Individual agents work independently for specialized tasks
- **Multi-Agent**: Orchestrator agent coordinates multiple agents for complex tasks
- **Sermon Shaper**: Specialized multi-agent system with 9 sub-agents working together
- **Handoffs**: Agent handoff system via `agent_handoffs` and `handoff_events` tables

**Agent Interaction with Platform**:
- **API Calls**: Agents accessible via API routes (`/api/agents/*`)
- **Database Access**: Agents can query database via tools (with proper permissions)
- **Content Manipulation**: Agents can analyze and suggest edits via editor tools
- **Context Access**: Agents access user profiles, assessment results, course progress via context engine

---

## Summary: The Movemental AI Approach

**What AI Agents Do**:
- 22 specialized AI agents assist with content creation and repurposing
- Voice & Vocation Coach, SEO Expert, Related Content, and 19 other specialized agents
- Support SEO and discovery optimization
- Provide content ideas and strategy suggestions
- Analyze analytics and provide insights
- Context-aware assistance via Unified Movemental Profile

**What AI Agents Never Do**:
- Publish without approval
- Replace your voice
- Compromise theological integrity
- Make strategic decisions
- Access unauthorized information
- Provide pastoral care or counseling

**How Memory Works**:
- Author-specific memory preserves your voice and preferences
- Network-level memory (opt-in) provides aggregated insights
- You control your memory and can update it as needed

**How You Retain Control**:
- Editorial control at every step
- Voice control through training and feedback
- Strategic control over all decisions
- Transparency control over disclosure

**How Errors Are Handled**:
- Proactive prevention through validation
- Immediate correction when identified
- Continuous improvement through feedback
- Documentation to prevent recurrence

**The Result**: AI amplifies your work while preserving your voice, maintaining your control, and building trust through transparency and clear boundaries.

---

*This guide provides clear boundaries and expectations for AI agent behavior, ensuring trust, control, and authenticity while leveraging AI capabilities effectively.*

