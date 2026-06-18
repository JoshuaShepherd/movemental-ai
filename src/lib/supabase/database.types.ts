export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      access_expirations: {
        Row: {
          created_at: string
          enrollment_id: string
          expires_at: string
          extended_at: string | null
          extended_by: string | null
          id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          expires_at: string
          extended_at?: string | null
          extended_by?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          expires_at?: string
          extended_at?: string | null
          extended_by?: string | null
          id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_expirations_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_expirations_extended_by_user_profiles_id_fk"
            columns: ["extended_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_referrals: {
        Row: {
          affiliate_id: string
          commission_amount: number | null
          course_id: string | null
          created_at: string
          id: string
          purchase_id: string | null
          referred_user_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          commission_amount?: number | null
          course_id?: string | null
          created_at?: string
          id?: string
          purchase_id?: string | null
          referred_user_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number | null
          course_id?: string | null
          created_at?: string
          id?: string
          purchase_id?: string | null
          referred_user_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referrals_affiliate_id_affiliates_id_fk"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_referrals_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_referrals_purchase_id_purchases_id_fk"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_referrals_referred_user_id_user_profiles_id_fk"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_code: string
          commission_rate: number
          created_at: string
          id: string
          status: string | null
          total_earnings: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_code: string
          commission_rate: number
          created_at?: string
          id?: string
          status?: string | null
          total_earnings?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_code?: string
          commission_rate?: number
          created_at?: string
          id?: string
          status?: string | null
          total_earnings?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliates_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_guardrail_assignments: {
        Row: {
          agent_id: string
          config: Json | null
          created_at: string
          enabled: boolean | null
          guardrail_id: string
          id: string
          order: number | null
          organization_id: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          guardrail_id: string
          id?: string
          order?: number | null
          organization_id: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          guardrail_id?: string
          id?: string
          order?: number | null
          organization_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      agent_guardrails: {
        Row: {
          config: Json | null
          created_at: string
          description: string | null
          execution_mode: string | null
          execution_phase: string | null
          guardrail_data: Json
          guardrail_type: string
          id: string
          implementation: string | null
          is_active: boolean | null
          name: string
          organization_id: string
          type: string | null
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          description?: string | null
          execution_mode?: string | null
          execution_phase?: string | null
          guardrail_data: Json
          guardrail_type: string
          id?: string
          implementation?: string | null
          is_active?: boolean | null
          name: string
          organization_id: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          description?: string | null
          execution_mode?: string | null
          execution_phase?: string | null
          guardrail_data?: Json
          guardrail_type?: string
          id?: string
          implementation?: string | null
          is_active?: boolean | null
          name?: string
          organization_id?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_guardrails_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_handoffs: {
        Row: {
          created_at: string
          from_agent_id: string
          id: string
          is_active: boolean | null
          priority: number | null
          to_agent_id: string
          trigger_rules: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          from_agent_id: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          to_agent_id: string
          trigger_rules?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          from_agent_id?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          to_agent_id?: string
          trigger_rules?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_handoffs_from_agent_id_agents_id_fk"
            columns: ["from_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_handoffs_to_agent_id_agents_id_fk"
            columns: ["to_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_instances: {
        Row: {
          agent_id: string
          assistant_id: string | null
          completed_at: string | null
          context: Json | null
          conversation_id: string | null
          created_at: string
          error_message: string | null
          id: string
          instance_data: Json | null
          organization_id: string
          session_id: string | null
          started_at: string | null
          status: string | null
          thread_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id: string
          assistant_id?: string | null
          completed_at?: string | null
          context?: Json | null
          conversation_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          instance_data?: Json | null
          organization_id: string
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          thread_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_id?: string
          assistant_id?: string | null
          completed_at?: string | null
          context?: Json | null
          conversation_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          instance_data?: Json | null
          organization_id?: string
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          thread_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_instances_agent_id_agents_id_fk"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_interactions: {
        Row: {
          agent_id: string
          agent_name: string
          created_at: string
          id: string
          message: string
          metadata: Json | null
          response: string | null
          sermon_preparation_id: string | null
          tools_used: Json | null
        }
        Insert: {
          agent_id: string
          agent_name: string
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          response?: string | null
          sermon_preparation_id?: string | null
          tools_used?: Json | null
        }
        Update: {
          agent_id?: string
          agent_name?: string
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          response?: string | null
          sermon_preparation_id?: string | null
          tools_used?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_interactions_sermon_preparation_id_sermon_preparations_id"
            columns: ["sermon_preparation_id"]
            isOneToOne: false
            referencedRelation: "sermon_preparations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_metrics: {
        Row: {
          agent_id: string
          avg_response_time: number | null
          cost_total: number | null
          created_at: string
          date: string
          error_count: number | null
          id: string
          metadata: Json | null
          success_rate: number | null
          tokens_total: number | null
          updated_at: string
          usage_count: number | null
          user_rating: number | null
        }
        Insert: {
          agent_id: string
          avg_response_time?: number | null
          cost_total?: number | null
          created_at?: string
          date: string
          error_count?: number | null
          id?: string
          metadata?: Json | null
          success_rate?: number | null
          tokens_total?: number | null
          updated_at?: string
          usage_count?: number | null
          user_rating?: number | null
        }
        Update: {
          agent_id?: string
          avg_response_time?: number | null
          cost_total?: number | null
          created_at?: string
          date?: string
          error_count?: number | null
          id?: string
          metadata?: Json | null
          success_rate?: number | null
          tokens_total?: number | null
          updated_at?: string
          usage_count?: number | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_metrics_agent_id_agents_id_fk"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_room_leads: {
        Row: {
          anon_id: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          kind: string
          map_answers: Json | null
          metadata: Json | null
          name: string | null
          organization: string | null
          organization_id: string
          role: string | null
          session_id: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          anon_id?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          kind: string
          map_answers?: Json | null
          metadata?: Json | null
          name?: string | null
          organization?: string | null
          organization_id: string
          role?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          anon_id?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          kind?: string
          map_answers?: Json | null
          metadata?: Json | null
          name?: string | null
          organization?: string | null
          organization_id?: string
          role?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_room_leads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_room_transcripts: {
        Row: {
          agent_slug: string
          anon_id: string | null
          created_at: string
          id: string
          message_text: string
          metadata: Json | null
          organization_id: string
          phase: string | null
          role: string
          screen_id: string | null
          session_id: string | null
          tool_calls: Json | null
        }
        Insert: {
          agent_slug: string
          anon_id?: string | null
          created_at?: string
          id?: string
          message_text: string
          metadata?: Json | null
          organization_id: string
          phase?: string | null
          role: string
          screen_id?: string | null
          session_id?: string | null
          tool_calls?: Json | null
        }
        Update: {
          agent_slug?: string
          anon_id?: string | null
          created_at?: string
          id?: string
          message_text?: string
          metadata?: Json | null
          organization_id?: string
          phase?: string | null
          role?: string
          screen_id?: string | null
          session_id?: string | null
          tool_calls?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_room_transcripts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tool_assignments: {
        Row: {
          agent_id: string
          config: Json | null
          created_at: string
          enabled: boolean | null
          id: string
          order: number | null
          organization_id: string
          tool_id: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          order?: number | null
          organization_id: string
          tool_id: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          config?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          order?: number | null
          organization_id?: string
          tool_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tool_assignments_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tools: {
        Row: {
          config: Json | null
          created_at: string
          description: string | null
          execution_type: string | null
          id: string
          implementation: string | null
          is_active: boolean | null
          name: string
          organization_id: string
          tool_category: string | null
          tool_config: Json
          tool_type: string
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          description?: string | null
          execution_type?: string | null
          id?: string
          implementation?: string | null
          is_active?: boolean | null
          name: string
          organization_id: string
          tool_category?: string | null
          tool_config: Json
          tool_type: string
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          description?: string | null
          execution_type?: string | null
          id?: string
          implementation?: string | null
          is_active?: boolean | null
          name?: string
          organization_id?: string
          tool_category?: string | null
          tool_config?: Json
          tool_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tools_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_traces: {
        Row: {
          agent_id: string | null
          agent_instance_id: string | null
          agent_name: string | null
          conversation_id: string | null
          created_at: string
          duration: number | null
          end_time: string | null
          error_message: string | null
          events: Json | null
          id: string
          instance_id: string | null
          metadata: Json | null
          organization_id: string
          output_length: number | null
          start_time: string | null
          tool_calls_count: number | null
          trace_data: Json
          trace_type: string
        }
        Insert: {
          agent_id?: string | null
          agent_instance_id?: string | null
          agent_name?: string | null
          conversation_id?: string | null
          created_at?: string
          duration?: number | null
          end_time?: string | null
          error_message?: string | null
          events?: Json | null
          id?: string
          instance_id?: string | null
          metadata?: Json | null
          organization_id: string
          output_length?: number | null
          start_time?: string | null
          tool_calls_count?: number | null
          trace_data: Json
          trace_type: string
        }
        Update: {
          agent_id?: string | null
          agent_instance_id?: string | null
          agent_name?: string | null
          conversation_id?: string | null
          created_at?: string
          duration?: number | null
          end_time?: string | null
          error_message?: string | null
          events?: Json | null
          id?: string
          instance_id?: string | null
          metadata?: Json | null
          organization_id?: string
          output_length?: number | null
          start_time?: string | null
          tool_calls_count?: number | null
          trace_data?: Json
          trace_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_traces_agent_instance_id_agent_instances_id_fk"
            columns: ["agent_instance_id"]
            isOneToOne: false
            referencedRelation: "agent_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_traces_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          agent_type: string | null
          corpus_binding_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          instructions: string | null
          max_tokens: number | null
          metadata: Json | null
          model: string | null
          name: string
          organization_id: string
          prompt_pack_id: string | null
          slug: string
          status: string | null
          stream_chunk_size: number | null
          stream_enabled: boolean | null
          stream_format: string | null
          system_prompt: string
          temperature: number | null
          top_p: number | null
          updated_at: string
          version: number | null
        }
        Insert: {
          agent_type?: string | null
          corpus_binding_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          instructions?: string | null
          max_tokens?: number | null
          metadata?: Json | null
          model?: string | null
          name: string
          organization_id: string
          prompt_pack_id?: string | null
          slug: string
          status?: string | null
          stream_chunk_size?: number | null
          stream_enabled?: boolean | null
          stream_format?: string | null
          system_prompt: string
          temperature?: number | null
          top_p?: number | null
          updated_at?: string
          version?: number | null
        }
        Update: {
          agent_type?: string | null
          corpus_binding_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          instructions?: string | null
          max_tokens?: number | null
          metadata?: Json | null
          model?: string | null
          name?: string
          organization_id?: string
          prompt_pack_id?: string | null
          slug?: string
          status?: string | null
          stream_chunk_size?: number | null
          stream_enabled?: boolean | null
          stream_format?: string | null
          system_prompt?: string
          temperature?: number | null
          top_p?: number | null
          updated_at?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_corpus_binding_id_fkey"
            columns: ["corpus_binding_id"]
            isOneToOne: false
            referencedRelation: "corpus_bindings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agents_prompt_pack_id_fkey"
            columns: ["prompt_pack_id"]
            isOneToOne: false
            referencedRelation: "prompt_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string
          id: string
          insight_type: string
          metadata: Json | null
          related_entities: Json | null
          source_assessment_id: string | null
          source_conversation_id: string | null
          title: string
          updated_at: string
          user_accepted: boolean | null
          user_feedback: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description: string
          id?: string
          insight_type: string
          metadata?: Json | null
          related_entities?: Json | null
          source_assessment_id?: string | null
          source_conversation_id?: string | null
          title: string
          updated_at?: string
          user_accepted?: boolean | null
          user_feedback?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string
          id?: string
          insight_type?: string
          metadata?: Json | null
          related_entities?: Json | null
          source_assessment_id?: string | null
          source_conversation_id?: string | null
          title?: string
          updated_at?: string
          user_accepted?: boolean | null
          user_feedback?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_source_assessment_id_user_assessments_id_fk"
            columns: ["source_assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_insights_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lab_conversations: {
        Row: {
          context: Json | null
          conversation_data: Json | null
          created_at: string
          id: string
          messages: Json | null
          mode: string | null
          organization_id: string | null
          session_id: string | null
          style: string | null
          theme: string | null
          title: string | null
          topics: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          conversation_data?: Json | null
          created_at?: string
          id?: string
          messages?: Json | null
          mode?: string | null
          organization_id?: string | null
          session_id?: string | null
          style?: string | null
          theme?: string | null
          title?: string | null
          topics?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          conversation_data?: Json | null
          created_at?: string
          id?: string
          messages?: Json | null
          mode?: string | null
          organization_id?: string | null
          session_id?: string | null
          style?: string | null
          theme?: string | null
          title?: string | null
          topics?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_lab_conversations_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lab_lite_conversations: {
        Row: {
          context: Json | null
          conversation_data: Json | null
          created_at: string
          id: string
          messages: Json | null
          organization_id: string
          session_id: string | null
          theme: string | null
          title: string | null
          topics: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context?: Json | null
          conversation_data?: Json | null
          created_at?: string
          id?: string
          messages?: Json | null
          organization_id: string
          session_id?: string | null
          theme?: string | null
          title?: string | null
          topics?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context?: Json | null
          conversation_data?: Json | null
          created_at?: string
          id?: string
          messages?: Json | null
          organization_id?: string
          session_id?: string | null
          theme?: string | null
          title?: string | null
          topics?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_lab_test_feedback: {
        Row: {
          confidence_rating: number | null
          created_at: string
          did_feel_off_brand: boolean | null
          did_speculate: boolean | null
          groundedness_rating: number | null
          helpfulness_rating: number | null
          id: string
          notes: string | null
          organization_id: string
          outcome_rating: string
          recommended_followup: string | null
          safety_rating: number | null
          test_run_id: string
          ticket_id: string
          user_id: string | null
          voice_authenticity_rating: number | null
          would_quote_publicly: boolean | null
        }
        Insert: {
          confidence_rating?: number | null
          created_at?: string
          did_feel_off_brand?: boolean | null
          did_speculate?: boolean | null
          groundedness_rating?: number | null
          helpfulness_rating?: number | null
          id?: string
          notes?: string | null
          organization_id: string
          outcome_rating: string
          recommended_followup?: string | null
          safety_rating?: number | null
          test_run_id: string
          ticket_id: string
          user_id?: string | null
          voice_authenticity_rating?: number | null
          would_quote_publicly?: boolean | null
        }
        Update: {
          confidence_rating?: number | null
          created_at?: string
          did_feel_off_brand?: boolean | null
          did_speculate?: boolean | null
          groundedness_rating?: number | null
          helpfulness_rating?: number | null
          id?: string
          notes?: string | null
          organization_id?: string
          outcome_rating?: string
          recommended_followup?: string | null
          safety_rating?: number | null
          test_run_id?: string
          ticket_id?: string
          user_id?: string | null
          voice_authenticity_rating?: number | null
          would_quote_publicly?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_lab_test_feedback_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_lab_test_feedback_test_run_id_ai_lab_test_runs_id_fk"
            columns: ["test_run_id"]
            isOneToOne: false
            referencedRelation: "ai_lab_test_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_lab_test_feedback_ticket_id_ai_lab_test_tickets_id_fk"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ai_lab_test_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lab_test_flags: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          details: string | null
          feedback_id: string | null
          flag_type: string
          id: string
          organization_id: string
          resolved_at: string | null
          severity: string
          status: string | null
          summary: string
          test_run_id: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          details?: string | null
          feedback_id?: string | null
          flag_type: string
          id?: string
          organization_id: string
          resolved_at?: string | null
          severity: string
          status?: string | null
          summary: string
          test_run_id: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          details?: string | null
          feedback_id?: string | null
          flag_type?: string
          id?: string
          organization_id?: string
          resolved_at?: string | null
          severity?: string
          status?: string | null
          summary?: string
          test_run_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_lab_test_flags_feedback_id_ai_lab_test_feedback_id_fk"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "ai_lab_test_feedback"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_lab_test_flags_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_lab_test_flags_test_run_id_ai_lab_test_runs_id_fk"
            columns: ["test_run_id"]
            isOneToOne: false
            referencedRelation: "ai_lab_test_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lab_test_runs: {
        Row: {
          agent_name: string | null
          completed_at: string | null
          entry_context: Json | null
          id: string
          metrics_snapshot: Json | null
          model_name: string | null
          organization_id: string
          session_id: string | null
          started_at: string
          status: string | null
          ticket_id: string
          trace_id: string | null
          transcript_excerpt: string | null
          user_id: string | null
        }
        Insert: {
          agent_name?: string | null
          completed_at?: string | null
          entry_context?: Json | null
          id?: string
          metrics_snapshot?: Json | null
          model_name?: string | null
          organization_id: string
          session_id?: string | null
          started_at?: string
          status?: string | null
          ticket_id: string
          trace_id?: string | null
          transcript_excerpt?: string | null
          user_id?: string | null
        }
        Update: {
          agent_name?: string | null
          completed_at?: string | null
          entry_context?: Json | null
          id?: string
          metrics_snapshot?: Json | null
          model_name?: string | null
          organization_id?: string
          session_id?: string | null
          started_at?: string
          status?: string | null
          ticket_id?: string
          trace_id?: string | null
          transcript_excerpt?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_lab_test_runs_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_lab_test_runs_ticket_id_ai_lab_test_tickets_id_fk"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "ai_lab_test_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lab_test_tickets: {
        Row: {
          audience: string | null
          category: string
          created_at: string
          description: string | null
          difficulty: string | null
          display_order: number | null
          estimated_minutes: number | null
          goal: string | null
          id: string
          is_featured: boolean | null
          organization_id: string
          prompt_starter: string
          risk_tags: Json | null
          slug: string
          status: string | null
          success_criteria: string | null
          suggested_followups: Json | null
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          audience?: string | null
          category: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          display_order?: number | null
          estimated_minutes?: number | null
          goal?: string | null
          id?: string
          is_featured?: boolean | null
          organization_id: string
          prompt_starter: string
          risk_tags?: Json | null
          slug: string
          status?: string | null
          success_criteria?: string | null
          suggested_followups?: Json | null
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          audience?: string | null
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          display_order?: number | null
          estimated_minutes?: number | null
          goal?: string | null
          id?: string
          is_featured?: boolean | null
          organization_id?: string
          prompt_starter?: string
          risk_tags?: Json | null
          slug?: string
          status?: string | null
          success_criteria?: string | null
          suggested_followups?: Json | null
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_lab_test_tickets_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reality_invites: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          label: string | null
          organization_id: string
          revoked_at: string | null
          token_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          label?: string | null
          organization_id: string
          revoked_at?: string | null
          token_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          label?: string | null
          organization_id?: string
          revoked_at?: string | null
          token_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_reality_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_reality_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reality_org_results: {
        Row: {
          created_at: string
          id: string
          invited_count: number
          organization_id: string
          responded_count: number
          result_payload: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_count?: number
          organization_id: string
          responded_count?: number
          result_payload: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_count?: number
          organization_id?: string
          responded_count?: number
          result_payload?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_reality_org_results_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reality_results: {
        Row: {
          anon_id: string | null
          anon_submission: boolean
          audience: string | null
          created_at: string
          display_name: string | null
          dominant_gap: string | null
          email: string | null
          id: string
          illusion_flags: Json
          instrument: string
          invite_id: string | null
          organization_id: string
          overall_percent: number | null
          result_payload: Json
          session_id: string | null
          stage_safety: number | null
          stage_sandbox: number | null
          stage_skills: number | null
          stage_solutions: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          anon_submission?: boolean
          audience?: string | null
          created_at?: string
          display_name?: string | null
          dominant_gap?: string | null
          email?: string | null
          id?: string
          illusion_flags?: Json
          instrument: string
          invite_id?: string | null
          organization_id: string
          overall_percent?: number | null
          result_payload: Json
          session_id?: string | null
          stage_safety?: number | null
          stage_sandbox?: number | null
          stage_skills?: number | null
          stage_solutions?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          anon_submission?: boolean
          audience?: string | null
          created_at?: string
          display_name?: string | null
          dominant_gap?: string | null
          email?: string | null
          id?: string
          illusion_flags?: Json
          instrument?: string
          invite_id?: string | null
          organization_id?: string
          overall_percent?: number | null
          result_payload?: Json
          session_id?: string | null
          stage_safety?: number | null
          stage_sandbox?: number | null
          stage_skills?: number | null
          stage_solutions?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_reality_results_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "ai_reality_invites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_reality_results_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_reality_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reality_share_tokens: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          organization_id: string
          revoked_at: string | null
          token_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id: string
          revoked_at?: string | null
          token_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          organization_id?: string
          revoked_at?: string | null
          token_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_reality_share_tokens_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_reality_share_tokens_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string
          event_action: string
          event_category: string
          event_label: string | null
          event_type: string
          id: string
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_action: string
          event_category: string
          event_label?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_action?: string
          event_category?: string
          event_label?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      archive_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          order_index: number | null
          organization_id: string
          slug: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          order_index?: number | null
          organization_id: string
          slug: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          order_index?: number | null
          organization_id?: string
          slug?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_collections_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      archive_item_revisions: {
        Row: {
          archive_item_id: string
          content_html: string | null
          content_markdown: string | null
          created_at: string
          created_by: string | null
          id: string
          metadata: Json | null
          summary: string | null
          title: string | null
          version_number: number | null
        }
        Insert: {
          archive_item_id: string
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
          title?: string | null
          version_number?: number | null
        }
        Update: {
          archive_item_id?: string
          content_html?: string | null
          content_markdown?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          summary?: string | null
          title?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "archive_item_revisions_archive_item_id_archive_items_id_fk"
            columns: ["archive_item_id"]
            isOneToOne: false
            referencedRelation: "archive_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_item_revisions_created_by_user_profiles_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      archive_items: {
        Row: {
          collection_id: string | null
          content: string
          created_at: string
          id: string
          metadata: Json | null
          organization_id: string
          slug: string
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          collection_id?: string | null
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          organization_id: string
          slug: string
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          collection_id?: string | null
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          organization_id?: string
          slug?: string
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_items_collection_id_archive_collections_id_fk"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "archive_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_items_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_items_topic_id_archive_topics_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "archive_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      archive_media: {
        Row: {
          archive_item_id: string
          created_at: string
          description: string | null
          id: string
          media_type: string
          metadata: Json | null
          order_index: number | null
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          archive_item_id: string
          created_at?: string
          description?: string | null
          id?: string
          media_type: string
          metadata?: Json | null
          order_index?: number | null
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          archive_item_id?: string
          created_at?: string
          description?: string | null
          id?: string
          media_type?: string
          metadata?: Json | null
          order_index?: number | null
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_media_archive_item_id_archive_items_id_fk"
            columns: ["archive_item_id"]
            isOneToOne: false
            referencedRelation: "archive_items"
            referencedColumns: ["id"]
          },
        ]
      }
      archive_quotes: {
        Row: {
          archive_item_id: string
          attribution: string | null
          created_at: string
          id: string
          page_reference: string | null
          quote: string
          source: string | null
          tags: Json | null
          updated_at: string
        }
        Insert: {
          archive_item_id: string
          attribution?: string | null
          created_at?: string
          id?: string
          page_reference?: string | null
          quote: string
          source?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Update: {
          archive_item_id?: string
          attribution?: string | null
          created_at?: string
          id?: string
          page_reference?: string | null
          quote?: string
          source?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_quotes_archive_item_id_archive_items_id_fk"
            columns: ["archive_item_id"]
            isOneToOne: false
            referencedRelation: "archive_items"
            referencedColumns: ["id"]
          },
        ]
      }
      archive_topics: {
        Row: {
          collection_id: string | null
          created_at: string
          depth: number | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          order_index: number | null
          organization_id: string
          parent_topic_id: string | null
          slug: string
          title: string | null
          updated_at: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          depth?: number | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          order_index?: number | null
          organization_id: string
          parent_topic_id?: string | null
          slug: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          depth?: number | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          order_index?: number | null
          organization_id?: string
          parent_topic_id?: string | null
          slug?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_topics_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_checkpoints: {
        Row: {
          block_order: number | null
          course_id: string | null
          created_at: string
          description: string | null
          id: string
          is_optional: boolean | null
          lesson_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_optional?: boolean | null
          lesson_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_optional?: boolean | null
          lesson_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_checkpoints_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_checkpoints_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          answer_options: Json | null
          apest_dimension: string | null
          assessment_id: string
          category: string | null
          created_at: string
          id: string
          is_required: boolean | null
          maturity_level: number | null
          mdna_element: string | null
          order_index: number
          organization_id: string
          question_key: string | null
          question_text: string
          question_type: string
          reverse_scored: boolean | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          answer_options?: Json | null
          apest_dimension?: string | null
          assessment_id: string
          category?: string | null
          created_at?: string
          id?: string
          is_required?: boolean | null
          maturity_level?: number | null
          mdna_element?: string | null
          order_index: number
          organization_id: string
          question_key?: string | null
          question_text: string
          question_type: string
          reverse_scored?: boolean | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          answer_options?: Json | null
          apest_dimension?: string | null
          assessment_id?: string
          category?: string | null
          created_at?: string
          id?: string
          is_required?: boolean | null
          maturity_level?: number | null
          mdna_element?: string | null
          order_index?: number
          organization_id?: string
          question_key?: string | null
          question_text?: string
          question_type?: string
          reverse_scored?: boolean | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_assessments_id_fk"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_questions_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_responses: {
        Row: {
          confidence: number | null
          created_at: string
          id: string
          organization_id: string
          question_id: string
          response_json: Json | null
          response_text: string | null
          response_time: number | null
          response_value: number | null
          skipped: boolean | null
          updated_at: string
          user_assessment_id: string
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          id?: string
          organization_id: string
          question_id: string
          response_json?: Json | null
          response_text?: string | null
          response_time?: number | null
          response_value?: number | null
          skipped?: boolean | null
          updated_at?: string
          user_assessment_id: string
        }
        Update: {
          confidence?: number | null
          created_at?: string
          id?: string
          organization_id?: string
          question_id?: string
          response_json?: Json | null
          response_text?: string | null
          response_time?: number | null
          response_value?: number | null
          skipped?: boolean | null
          updated_at?: string
          user_assessment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_responses_question_id_assessment_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_responses_user_assessment_id_user_assessments_id_fk"
            columns: ["user_assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          created_at: string
          email: string
          id: string
          scores: Json
          total_score: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          scores: Json
          total_score: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          scores?: Json
          total_score?: number
        }
        Relationships: []
      }
      assessment_share_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          include_personal_info: boolean | null
          share_token: string
          updated_at: string
          user_assessment_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          include_personal_info?: boolean | null
          share_token: string
          updated_at?: string
          user_assessment_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          include_personal_info?: boolean | null
          share_token?: string
          updated_at?: string
          user_assessment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_share_tokens_user_assessment_id_user_assessments_id_"
            columns: ["user_assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          assessment_type: string
          certificate_enabled: boolean | null
          certificate_minimum_score: number | null
          certificate_template_id: string | null
          created_at: string
          cultural_adaptation: string | null
          description: string | null
          estimated_duration: number | null
          id: string
          instructions: string | null
          language: string | null
          name: string
          organization_id: string
          passing_score: number | null
          published_at: string | null
          questions_count: number
          reliability_score: number | null
          research_backed: boolean | null
          scoring_method: string | null
          slug: string
          status: string | null
          updated_at: string
          validity_score: number | null
          version: string | null
        }
        Insert: {
          assessment_type: string
          certificate_enabled?: boolean | null
          certificate_minimum_score?: number | null
          certificate_template_id?: string | null
          created_at?: string
          cultural_adaptation?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          instructions?: string | null
          language?: string | null
          name: string
          organization_id: string
          passing_score?: number | null
          published_at?: string | null
          questions_count: number
          reliability_score?: number | null
          research_backed?: boolean | null
          scoring_method?: string | null
          slug: string
          status?: string | null
          updated_at?: string
          validity_score?: number | null
          version?: string | null
        }
        Update: {
          assessment_type?: string
          certificate_enabled?: boolean | null
          certificate_minimum_score?: number | null
          certificate_template_id?: string | null
          created_at?: string
          cultural_adaptation?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          instructions?: string | null
          language?: string | null
          name?: string
          organization_id?: string
          passing_score?: number | null
          published_at?: string | null
          questions_count?: number
          reliability_score?: number | null
          research_backed?: boolean | null
          scoring_method?: string | null
          slug?: string
          status?: string | null
          updated_at?: string
          validity_score?: number | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_grades: {
        Row: {
          created_at: string
          feedback: string | null
          graded_at: string | null
          grader_id: string
          id: string
          rubric_scores: Json | null
          score: number
          submission_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          graded_at?: string | null
          grader_id: string
          id?: string
          rubric_scores?: Json | null
          score: number
          submission_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          feedback?: string | null
          graded_at?: string | null
          grader_id?: string
          id?: string
          rubric_scores?: Json | null
          score?: number
          submission_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_grades_grader_id_user_profiles_id_fk"
            columns: ["grader_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_grades_submission_id_assignment_submissions_id_fk"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "assignment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          attachments: Json | null
          content: string
          created_at: string
          enrollment_id: string
          feedback: string | null
          graded_at: string | null
          id: string
          score: number | null
          status: string | null
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          attachments?: Json | null
          content: string
          created_at?: string
          enrollment_id: string
          feedback?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          attachments?: Json | null
          content?: string
          created_at?: string
          enrollment_id?: string
          feedback?: string | null
          graded_at?: string | null
          id?: string
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_course_assignments_id_fk"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "course_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audience_profiles: {
        Row: {
          audience_name: string
          content_preferences: Json | null
          created_at: string
          demographics: Json | null
          description: string | null
          engagement_metrics: Json | null
          growth_trends: Json | null
          id: string
          metadata: Json | null
          primary_channel: string | null
          size_estimate: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audience_name: string
          content_preferences?: Json | null
          created_at?: string
          demographics?: Json | null
          description?: string | null
          engagement_metrics?: Json | null
          growth_trends?: Json | null
          id?: string
          metadata?: Json | null
          primary_channel?: string | null
          size_estimate?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audience_name?: string
          content_preferences?: Json | null
          created_at?: string
          demographics?: Json | null
          description?: string | null
          engagement_metrics?: Json | null
          growth_trends?: Json | null
          id?: string
          metadata?: Json | null
          primary_channel?: string | null
          size_estimate?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_chapters: {
        Row: {
          audio_url: string | null
          book_id: string
          bookmark_count: number | null
          chapter_number: number
          content: string
          created_at: string
          estimated_reading_time: number | null
          excerpt: string | null
          has_audio_version: boolean | null
          has_discussion_questions: boolean | null
          has_table_of_contents: boolean | null
          id: string
          is_preview: boolean | null
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          organization_id: string
          published_at: string | null
          slug: string
          sort_order: number | null
          status: string | null
          title: string
          updated_at: string
          view_count: number | null
          word_count: number | null
        }
        Insert: {
          audio_url?: string | null
          book_id: string
          bookmark_count?: number | null
          chapter_number: number
          content: string
          created_at?: string
          estimated_reading_time?: number | null
          excerpt?: string | null
          has_audio_version?: boolean | null
          has_discussion_questions?: boolean | null
          has_table_of_contents?: boolean | null
          id?: string
          is_preview?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id: string
          published_at?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Update: {
          audio_url?: string | null
          book_id?: string
          bookmark_count?: number | null
          chapter_number?: number
          content?: string
          created_at?: string
          estimated_reading_time?: number | null
          excerpt?: string | null
          has_audio_version?: boolean | null
          has_discussion_questions?: boolean | null
          has_table_of_contents?: boolean | null
          id?: string
          is_preview?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id?: string
          published_at?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_chapters_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_chapters_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      book_email_subscribers: {
        Row: {
          chapter_slug: string | null
          created_at: string
          email: string
          id: string
          lens: string
          source: string
          user_id: string | null
        }
        Insert: {
          chapter_slug?: string | null
          created_at?: string
          email: string
          id?: string
          lens?: string
          source: string
          user_id?: string | null
        }
        Update: {
          chapter_slug?: string | null
          created_at?: string
          email?: string
          id?: string
          lens?: string
          source?: string
          user_id?: string | null
        }
        Relationships: []
      }
      book_endorsements: {
        Row: {
          audience_lens: string | null
          chapter_slug: string | null
          context: string | null
          created_at: string
          endorser_avatar_url: string | null
          endorser_name: string
          endorser_org: string | null
          endorser_title: string
          endorser_url: string | null
          featured: boolean
          id: string
          quote: string
          status: string
        }
        Insert: {
          audience_lens?: string | null
          chapter_slug?: string | null
          context?: string | null
          created_at?: string
          endorser_avatar_url?: string | null
          endorser_name: string
          endorser_org?: string | null
          endorser_title: string
          endorser_url?: string | null
          featured?: boolean
          id?: string
          quote: string
          status?: string
        }
        Update: {
          audience_lens?: string | null
          chapter_slug?: string | null
          context?: string | null
          created_at?: string
          endorser_avatar_url?: string | null
          endorser_name?: string
          endorser_org?: string | null
          endorser_title?: string
          endorser_url?: string | null
          featured?: boolean
          id?: string
          quote?: string
          status?: string
        }
        Relationships: []
      }
      book_highlights: {
        Row: {
          book_id: string
          chapter_id: string | null
          color: string | null
          created_at: string
          id: string
          note: string | null
          position_end: number
          position_start: number
          selected_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          chapter_id?: string | null
          color?: string | null
          created_at?: string
          id?: string
          note?: string | null
          position_end: number
          position_start: number
          selected_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          chapter_id?: string | null
          color?: string | null
          created_at?: string
          id?: string
          note?: string | null
          position_end?: number
          position_start?: number
          selected_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_highlights_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_highlights_chapter_id_books_chapters_id_fk"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "books_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_highlights_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_margin_notes: {
        Row: {
          anchor_paragraph_id: string
          approved_at: string | null
          body: string
          chapter_slug: string
          contact_email: string | null
          contributor_display_name: string
          contributor_id: string | null
          contributor_title: string | null
          contributor_url: string | null
          created_at: string
          featured: boolean
          id: string
          status: string
          type: string
        }
        Insert: {
          anchor_paragraph_id: string
          approved_at?: string | null
          body: string
          chapter_slug: string
          contact_email?: string | null
          contributor_display_name: string
          contributor_id?: string | null
          contributor_title?: string | null
          contributor_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          status?: string
          type: string
        }
        Update: {
          anchor_paragraph_id?: string
          approved_at?: string | null
          body?: string
          chapter_slug?: string
          contact_email?: string | null
          contributor_display_name?: string
          contributor_id?: string | null
          contributor_title?: string | null
          contributor_url?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          status?: string
          type?: string
        }
        Relationships: []
      }
      book_pdf_editions: {
        Row: {
          book_id: string
          byte_size: number
          checksum: string | null
          cover_image_url: string | null
          cover_media_item_id: string | null
          created_at: string
          file_name: string
          id: string
          label: string
          mime_type: string
          organization_id: string
          storage_bucket: string
          storage_path: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          book_id: string
          byte_size: number
          checksum?: string | null
          cover_image_url?: string | null
          cover_media_item_id?: string | null
          created_at?: string
          file_name: string
          id?: string
          label?: string
          mime_type?: string
          organization_id: string
          storage_bucket: string
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          book_id?: string
          byte_size?: number
          checksum?: string | null
          cover_image_url?: string | null
          cover_media_item_id?: string | null
          created_at?: string
          file_name?: string
          id?: string
          label?: string
          mime_type?: string
          organization_id?: string
          storage_bucket?: string
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_pdf_editions_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_pdf_editions_cover_media_item_id_media_items_id_fk"
            columns: ["cover_media_item_id"]
            isOneToOne: false
            referencedRelation: "media_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_pdf_editions_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_pdf_editions_uploaded_by_user_profiles_id_fk"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_purchases: {
        Row: {
          access_expires_at: string | null
          access_granted_at: string | null
          amount_paid: number
          book_id: string
          created_at: string
          currency: string | null
          discount_applied: number | null
          gift_recipient_email: string | null
          id: string
          is_gift: boolean | null
          payment_method: string | null
          purchase_date: string | null
          refund_amount: number | null
          refund_reason: string | null
          refunded_at: string | null
          shopify_customer_id: string | null
          shopify_line_item_id: string | null
          shopify_order_id: string | null
          shopify_product_id: string | null
          status: string | null
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_expires_at?: string | null
          access_granted_at?: string | null
          amount_paid: number
          book_id: string
          created_at?: string
          currency?: string | null
          discount_applied?: number | null
          gift_recipient_email?: string | null
          id?: string
          is_gift?: boolean | null
          payment_method?: string | null
          purchase_date?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          refunded_at?: string | null
          shopify_customer_id?: string | null
          shopify_line_item_id?: string | null
          shopify_order_id?: string | null
          shopify_product_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_expires_at?: string | null
          access_granted_at?: string | null
          amount_paid?: number
          book_id?: string
          created_at?: string
          currency?: string | null
          discount_applied?: number | null
          gift_recipient_email?: string | null
          id?: string
          is_gift?: boolean | null
          payment_method?: string | null
          purchase_date?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          refunded_at?: string | null
          shopify_customer_id?: string | null
          shopify_line_item_id?: string | null
          shopify_order_id?: string | null
          shopify_product_id?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_purchases_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_purchases_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_reading_progress: {
        Row: {
          book_id: string
          bookmarks: Json | null
          chapter_id: string | null
          created_at: string
          id: string
          last_read_at: string | null
          percentage_complete: number | null
          reading_speed_wpm: number | null
          reading_time_seconds: number | null
          scroll_position: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          bookmarks?: Json | null
          chapter_id?: string | null
          created_at?: string
          id?: string
          last_read_at?: string | null
          percentage_complete?: number | null
          reading_speed_wpm?: number | null
          reading_time_seconds?: number | null
          scroll_position?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          bookmarks?: Json | null
          chapter_id?: string | null
          created_at?: string
          id?: string
          last_read_at?: string | null
          percentage_complete?: number | null
          reading_speed_wpm?: number | null
          reading_time_seconds?: number | null
          scroll_position?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reading_progress_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reading_progress_chapter_id_books_chapters_id_fk"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "books_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reading_progress_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_reviews: {
        Row: {
          book_id: string
          content: string
          created_at: string
          helpful_count: number | null
          id: string
          rating: number
          status: string | null
          title: string | null
          updated_at: string
          user_id: string
          verified_purchase: boolean | null
        }
        Insert: {
          book_id: string
          content: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          rating: number
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          verified_purchase?: boolean | null
        }
        Update: {
          book_id?: string
          content?: string
          created_at?: string
          helpful_count?: number | null
          id?: string
          rating?: number
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "book_reviews_book_id_books_id_fk"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_revisions: {
        Row: {
          after_text: string | null
          before_text: string | null
          chapter_slug: string
          credited_note_ids: Json
          id: string
          paragraph_id: string
          revised_at: string
          revision_summary: string
        }
        Insert: {
          after_text?: string | null
          before_text?: string | null
          chapter_slug: string
          credited_note_ids?: Json
          id?: string
          paragraph_id: string
          revised_at?: string
          revision_summary: string
        }
        Update: {
          after_text?: string | null
          before_text?: string | null
          chapter_slug?: string
          credited_note_ids?: Json
          id?: string
          paragraph_id?: string
          revised_at?: string
          revision_summary?: string
        }
        Relationships: []
      }
      book_series: {
        Row: {
          author_id: string | null
          book_count: number | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          slug: string
          status: string | null
          total_pages: number | null
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          book_count?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          slug: string
          status?: string | null
          total_pages?: number | null
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          book_count?: number | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          slug?: string
          status?: string | null
          total_pages?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_series_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_series_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          bookmarked_at: string | null
          created_at: string
          folder: string | null
          id: string
          notes: string | null
          resource_id: string
          resource_type: string
          tags: Json | null
          user_id: string
        }
        Insert: {
          bookmarked_at?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          notes?: string | null
          resource_id: string
          resource_type: string
          tags?: Json | null
          user_id: string
        }
        Update: {
          bookmarked_at?: string | null
          created_at?: string
          folder?: string | null
          id?: string
          notes?: string | null
          resource_id?: string
          resource_type?: string
          tags?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          access_type: string | null
          asin: string | null
          author_id: string | null
          average_rating: number | null
          book_id: string | null
          chapter_count: number | null
          chapters: Json | null
          co_authors: Json | null
          copyright_year: number | null
          cover_image: string | null
          cover_image_fallback: string | null
          cover_image_url: string | null
          created_at: string
          currency: string | null
          description: string | null
          difficulty_level: string | null
          discount_percentage: number | null
          drm_enabled: boolean | null
          editor: string | null
          excerpt: string | null
          formats: Json | null
          has_audio: boolean | null
          has_discussion_questions: boolean | null
          id: string
          is_active: boolean | null
          is_included_in_subscription: boolean | null
          isbn: string | null
          key_topics: Json | null
          language: string | null
          license_type: string | null
          mdx_source_url: string | null
          meta_description: string | null
          meta_title: string | null
          organization_id: string
          original_book_id: string | null
          page_count: number | null
          portal_themes: Json | null
          preview_chapters: number | null
          preview_chapters_count: number | null
          price_eur: number | null
          price_gbp: number | null
          price_range: Json | null
          price_usd: number | null
          primary_category_id: string | null
          publication_date: string | null
          published_at: string | null
          publisher: string | null
          purchase_count: number | null
          purchase_links: Json | null
          related_books: Json | null
          required_plan_tier: string | null
          review_count: number | null
          sale_ends_at: string | null
          sale_price_usd: number | null
          sample_content_url: string | null
          search_vector: string | null
          secondary_categories: Json | null
          seo_keywords: Json | null
          series_id: string | null
          series_order: number | null
          slug: string
          status: string | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          subtitle: string | null
          tags: Json | null
          target_audience: string[] | null
          theological_themes: Json | null
          title: string
          total_chapters: number | null
          updated_at: string
          view_count: number | null
          word_count: number | null
        }
        Insert: {
          access_type?: string | null
          asin?: string | null
          author_id?: string | null
          average_rating?: number | null
          book_id?: string | null
          chapter_count?: number | null
          chapters?: Json | null
          co_authors?: Json | null
          copyright_year?: number | null
          cover_image?: string | null
          cover_image_fallback?: string | null
          cover_image_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          difficulty_level?: string | null
          discount_percentage?: number | null
          drm_enabled?: boolean | null
          editor?: string | null
          excerpt?: string | null
          formats?: Json | null
          has_audio?: boolean | null
          has_discussion_questions?: boolean | null
          id?: string
          is_active?: boolean | null
          is_included_in_subscription?: boolean | null
          isbn?: string | null
          key_topics?: Json | null
          language?: string | null
          license_type?: string | null
          mdx_source_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id: string
          original_book_id?: string | null
          page_count?: number | null
          portal_themes?: Json | null
          preview_chapters?: number | null
          preview_chapters_count?: number | null
          price_eur?: number | null
          price_gbp?: number | null
          price_range?: Json | null
          price_usd?: number | null
          primary_category_id?: string | null
          publication_date?: string | null
          published_at?: string | null
          publisher?: string | null
          purchase_count?: number | null
          purchase_links?: Json | null
          related_books?: Json | null
          required_plan_tier?: string | null
          review_count?: number | null
          sale_ends_at?: string | null
          sale_price_usd?: number | null
          sample_content_url?: string | null
          search_vector?: string | null
          secondary_categories?: Json | null
          seo_keywords?: Json | null
          series_id?: string | null
          series_order?: number | null
          slug: string
          status?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subtitle?: string | null
          tags?: Json | null
          target_audience?: string[] | null
          theological_themes?: Json | null
          title: string
          total_chapters?: number | null
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Update: {
          access_type?: string | null
          asin?: string | null
          author_id?: string | null
          average_rating?: number | null
          book_id?: string | null
          chapter_count?: number | null
          chapters?: Json | null
          co_authors?: Json | null
          copyright_year?: number | null
          cover_image?: string | null
          cover_image_fallback?: string | null
          cover_image_url?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          difficulty_level?: string | null
          discount_percentage?: number | null
          drm_enabled?: boolean | null
          editor?: string | null
          excerpt?: string | null
          formats?: Json | null
          has_audio?: boolean | null
          has_discussion_questions?: boolean | null
          id?: string
          is_active?: boolean | null
          is_included_in_subscription?: boolean | null
          isbn?: string | null
          key_topics?: Json | null
          language?: string | null
          license_type?: string | null
          mdx_source_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id?: string
          original_book_id?: string | null
          page_count?: number | null
          portal_themes?: Json | null
          preview_chapters?: number | null
          preview_chapters_count?: number | null
          price_eur?: number | null
          price_gbp?: number | null
          price_range?: Json | null
          price_usd?: number | null
          primary_category_id?: string | null
          publication_date?: string | null
          published_at?: string | null
          publisher?: string | null
          purchase_count?: number | null
          purchase_links?: Json | null
          related_books?: Json | null
          required_plan_tier?: string | null
          review_count?: number | null
          sale_ends_at?: string | null
          sale_price_usd?: number | null
          sample_content_url?: string | null
          search_vector?: string | null
          secondary_categories?: Json | null
          seo_keywords?: Json | null
          series_id?: string | null
          series_order?: number | null
          slug?: string
          status?: string | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          subtitle?: string | null
          tags?: Json | null
          target_audience?: string[] | null
          theological_themes?: Json | null
          title?: string
          total_chapters?: number | null
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "books_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_primary_category_id_content_categories_id_fk"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_series_id_book_series_id_fk"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "book_series"
            referencedColumns: ["id"]
          },
        ]
      }
      books_chapters: {
        Row: {
          audio_url: string | null
          book_id: string
          bookmark_count: number | null
          chapter_number: number
          content: string
          created_at: string
          estimated_reading_time: number | null
          excerpt: string | null
          has_audio_version: boolean | null
          has_discussion_questions: boolean | null
          has_table_of_contents: boolean | null
          id: string
          is_active: boolean | null
          is_preview: boolean | null
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          order_index: number | null
          organization_id: string
          published_at: string | null
          slug: string
          sort_order: number | null
          status: string | null
          title: string
          updated_at: string
          view_count: number | null
          word_count: number | null
        }
        Insert: {
          audio_url?: string | null
          book_id: string
          bookmark_count?: number | null
          chapter_number: number
          content: string
          created_at?: string
          estimated_reading_time?: number | null
          excerpt?: string | null
          has_audio_version?: boolean | null
          has_discussion_questions?: boolean | null
          has_table_of_contents?: boolean | null
          id?: string
          is_active?: boolean | null
          is_preview?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          order_index?: number | null
          organization_id: string
          published_at?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Update: {
          audio_url?: string | null
          book_id?: string
          bookmark_count?: number | null
          chapter_number?: number
          content?: string
          created_at?: string
          estimated_reading_time?: number | null
          excerpt?: string | null
          has_audio_version?: boolean | null
          has_discussion_questions?: boolean | null
          has_table_of_contents?: boolean | null
          id?: string
          is_active?: boolean | null
          is_preview?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          order_index?: number | null
          organization_id?: string
          published_at?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "books_chapters_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ce_credits: {
        Row: {
          accreditation_body: string | null
          certificate_id: string | null
          created_at: string
          credit_hours: number
          credit_type: string
          entity_id: string
          entity_type: string
          expires_at: string | null
          id: string
          issued_at: string
          issuing_organization: string
          status: string | null
          updated_at: string
          user_id: string
          verification_url: string | null
        }
        Insert: {
          accreditation_body?: string | null
          certificate_id?: string | null
          created_at?: string
          credit_hours: number
          credit_type: string
          entity_id: string
          entity_type: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuing_organization: string
          status?: string | null
          updated_at?: string
          user_id: string
          verification_url?: string | null
        }
        Update: {
          accreditation_body?: string | null
          certificate_id?: string | null
          created_at?: string
          credit_hours?: number
          credit_type?: string
          entity_id?: string
          entity_type?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuing_organization?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ce_credits_certificate_id_certificates_id_fk"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ce_credits_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_templates: {
        Row: {
          background_image_url: string | null
          body_text_template: string | null
          certificate_type: string
          created_at: string
          created_by: string | null
          description: string | null
          footer_text: string | null
          header_text: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          logo_url: string | null
          name: string
          signature_image_url: string | null
          signature_name: string | null
          signature_title: string | null
          template_data: Json | null
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          body_text_template?: string | null
          certificate_type: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          logo_url?: string | null
          name: string
          signature_image_url?: string | null
          signature_name?: string | null
          signature_title?: string | null
          template_data?: Json | null
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          body_text_template?: string | null
          certificate_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          footer_text?: string | null
          header_text?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          logo_url?: string | null
          name?: string
          signature_image_url?: string | null
          signature_name?: string | null
          signature_title?: string | null
          template_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_templates_created_by_user_profiles_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_image_url: string | null
          certificate_type: string
          certificate_url: string | null
          created_at: string
          description: string | null
          enrollment_id: string | null
          entity_id: string | null
          entity_type: string | null
          expires_at: string | null
          id: string
          issued_at: string
          metadata: Json | null
          public_url: string | null
          revoked_at: string | null
          revoked_reason: string | null
          shareable: boolean | null
          status: string | null
          template_id: string | null
          title: string
          updated_at: string
          user_assessment_id: string | null
          user_id: string
          verification_code: string
        }
        Insert: {
          certificate_image_url?: string | null
          certificate_type: string
          certificate_url?: string | null
          created_at?: string
          description?: string | null
          enrollment_id?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          public_url?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          shareable?: boolean | null
          status?: string | null
          template_id?: string | null
          title: string
          updated_at?: string
          user_assessment_id?: string | null
          user_id: string
          verification_code: string
        }
        Update: {
          certificate_image_url?: string | null
          certificate_type?: string
          certificate_url?: string | null
          created_at?: string
          description?: string | null
          enrollment_id?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          issued_at?: string
          metadata?: Json | null
          public_url?: string | null
          revoked_at?: string | null
          revoked_reason?: string | null
          shareable?: boolean | null
          status?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string
          user_assessment_id?: string | null
          user_id?: string
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_template_id_certificate_templates_id_fk"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_assessment_id_user_assessments_id_fk"
            columns: ["user_assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      checkpoint_questions: {
        Row: {
          checkpoint_id: string
          correct_answer: string | null
          created_at: string
          id: string
          max_length: number | null
          options: Json | null
          question: string
          question_order: number | null
          question_type: string
          updated_at: string
        }
        Insert: {
          checkpoint_id: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          max_length?: number | null
          options?: Json | null
          question: string
          question_order?: number | null
          question_type: string
          updated_at?: string
        }
        Update: {
          checkpoint_id?: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          max_length?: number | null
          options?: Json | null
          question?: string
          question_order?: number | null
          question_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkpoint_questions_checkpoint_id_assessment_checkpoints_id_fk"
            columns: ["checkpoint_id"]
            isOneToOne: false
            referencedRelation: "assessment_checkpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      checkpoint_responses: {
        Row: {
          checkpoint_id: string
          created_at: string
          enrollment_id: string
          id: string
          is_correct: boolean | null
          question_id: string
          response: string
          score: number | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          checkpoint_id: string
          created_at?: string
          enrollment_id: string
          id?: string
          is_correct?: boolean | null
          question_id: string
          response: string
          score?: number | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          checkpoint_id?: string
          created_at?: string
          enrollment_id?: string
          id?: string
          is_correct?: boolean | null
          question_id?: string
          response?: string
          score?: number | null
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkpoint_responses_checkpoint_id_assessment_checkpoints_id_fk"
            columns: ["checkpoint_id"]
            isOneToOne: false
            referencedRelation: "assessment_checkpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoint_responses_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoint_responses_question_id_checkpoint_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "checkpoint_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      citations: {
        Row: {
          authors: Json | null
          citation_style: string | null
          citation_type: string
          collections: Json | null
          content_item_id: string | null
          created_at: string
          doi: string | null
          formatted_citation: string | null
          id: string
          isbn: string | null
          notes: string | null
          organization_id: string
          page_numbers: string | null
          publication_date: string | null
          publisher: string | null
          quote_text: string | null
          tags: Json | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          authors?: Json | null
          citation_style?: string | null
          citation_type: string
          collections?: Json | null
          content_item_id?: string | null
          created_at?: string
          doi?: string | null
          formatted_citation?: string | null
          id?: string
          isbn?: string | null
          notes?: string | null
          organization_id: string
          page_numbers?: string | null
          publication_date?: string | null
          publisher?: string | null
          quote_text?: string | null
          tags?: Json | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          authors?: Json | null
          citation_style?: string | null
          citation_type?: string
          collections?: Json | null
          content_item_id?: string | null
          created_at?: string
          doi?: string | null
          formatted_citation?: string | null
          id?: string
          isbn?: string | null
          notes?: string | null
          organization_id?: string
          page_numbers?: string | null
          publication_date?: string | null
          publisher?: string | null
          quote_text?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citations_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      coaching_huddles: {
        Row: {
          agenda: string | null
          coach_id: string | null
          cohort_id: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          notes: string | null
          outcomes: string | null
          participants: Json | null
          recording_url: string | null
          residency_project_id: string | null
          scheduled_at: string
          updated_at: string
        }
        Insert: {
          agenda?: string | null
          coach_id?: string | null
          cohort_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          outcomes?: string | null
          participants?: Json | null
          recording_url?: string | null
          residency_project_id?: string | null
          scheduled_at: string
          updated_at?: string
        }
        Update: {
          agenda?: string | null
          coach_id?: string | null
          cohort_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          outcomes?: string | null
          participants?: Json | null
          recording_url?: string | null
          residency_project_id?: string | null
          scheduled_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coaching_huddles_coach_id_user_profiles_id_fk"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coaching_huddles_cohort_id_cohorts_id_fk"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coaching_huddles_residency_project_id_residency_projects_id_fk"
            columns: ["residency_project_id"]
            isOneToOne: false
            referencedRelation: "residency_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_discussion_messages: {
        Row: {
          cohort_id: string
          content: string
          created_at: string
          id: string
          parent_id: string | null
          session_id: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cohort_id: string
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          session_id?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cohort_id?: string
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          session_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cohort_members: {
        Row: {
          created_at: string
          id: string
          leader_bio: string | null
          leader_name: string
          leader_role: string | null
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          leader_bio?: string | null
          leader_name: string
          leader_role?: string | null
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          leader_bio?: string | null
          leader_name?: string
          leader_role?: string | null
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_sessions: {
        Row: {
          attendance: Json | null
          cohort_id: string
          course_id: string
          created_at: string
          duration_minutes: number | null
          facilitator_id: string | null
          id: string
          meeting_url: string | null
          notes: string | null
          recording_url: string | null
          scheduled_at: string
          session_type: string | null
          transcript: string | null
          updated_at: string
          week_number: number
        }
        Insert: {
          attendance?: Json | null
          cohort_id: string
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          facilitator_id?: string | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          recording_url?: string | null
          scheduled_at: string
          session_type?: string | null
          transcript?: string | null
          updated_at?: string
          week_number: number
        }
        Update: {
          attendance?: Json | null
          cohort_id?: string
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          facilitator_id?: string | null
          id?: string
          meeting_url?: string | null
          notes?: string | null
          recording_url?: string | null
          scheduled_at?: string
          session_type?: string | null
          transcript?: string | null
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "cohort_sessions_cohort_id_cohorts_id_fk"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_sessions_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_sessions_facilitator_id_user_profiles_id_fk"
            columns: ["facilitator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_slot_selections: {
        Row: {
          display_name: string
          id: string
          locked_into_cohort_id: string | null
          organization_id: string
          selected_at: string
          slot_day: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour: number
          slot_starts_at: string
          timezone: string
          user_id: string
        }
        Insert: {
          display_name: string
          id?: string
          locked_into_cohort_id?: string | null
          organization_id: string
          selected_at?: string
          slot_day: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour: number
          slot_starts_at: string
          timezone: string
          user_id: string
        }
        Update: {
          display_name?: string
          id?: string
          locked_into_cohort_id?: string | null
          organization_id?: string
          selected_at?: string
          slot_day?: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour?: number
          slot_starts_at?: string
          timezone?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_slot_selections_locked_into_cohort_id_fkey"
            columns: ["locked_into_cohort_id"]
            isOneToOne: false
            referencedRelation: "onboarding_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_slot_selections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_slot_thresholds: {
        Row: {
          crossed_threshold_at: string
          notified: boolean
          slot_starts_at: string
        }
        Insert: {
          crossed_threshold_at?: string
          notified?: boolean
          slot_starts_at: string
        }
        Update: {
          crossed_threshold_at?: string
          notified?: boolean
          slot_starts_at?: string
        }
        Relationships: []
      }
      cohorts: {
        Row: {
          course_id: string
          created_at: string
          end_date: string
          facilitator_id: string | null
          id: string
          max_participants: number | null
          name: string
          participant_ids: Json | null
          settings: Json | null
          start_date: string
          status: string | null
          track_assignment: string | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          end_date: string
          facilitator_id?: string | null
          id?: string
          max_participants?: number | null
          name: string
          participant_ids?: Json | null
          settings?: Json | null
          start_date: string
          status?: string | null
          track_assignment?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          end_date?: string
          facilitator_id?: string | null
          id?: string
          max_participants?: number | null
          name?: string
          participant_ids?: Json | null
          settings?: Json | null
          start_date?: string
          status?: string | null
          track_assignment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohorts_facilitator_id_user_profiles_id_fk"
            columns: ["facilitator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_avatar_url: string | null
          author_email: string
          author_name: string
          content: string
          content_item_id: string
          created_at: string
          edited_at: string | null
          html_content: string | null
          id: string
          ip_address: string | null
          is_author_reply: boolean | null
          is_pinned: boolean | null
          like_count: number | null
          parent_id: string | null
          reply_count: number | null
          status: string | null
          thread_level: number | null
          updated_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_email: string
          author_name: string
          content: string
          content_item_id: string
          created_at?: string
          edited_at?: string | null
          html_content?: string | null
          id?: string
          ip_address?: string | null
          is_author_reply?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          reply_count?: number | null
          status?: string | null
          thread_level?: number | null
          updated_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          author_avatar_url?: string | null
          author_email?: string
          author_name?: string
          content?: string
          content_item_id?: string
          created_at?: string
          edited_at?: string | null
          html_content?: string | null
          id?: string
          ip_address?: string | null
          is_author_reply?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          reply_count?: number | null
          status?: string | null
          thread_level?: number | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      communities: {
        Row: {
          allow_guest_posts: boolean | null
          community_type: string
          created_at: string
          created_by: string
          cultural_context: string | null
          current_member_count: number | null
          description: string | null
          geographic_focus: Json | null
          guidelines: string | null
          id: string
          is_active: boolean | null
          join_approval_required: boolean | null
          language_primary: string | null
          languages_supported: Json | null
          max_members: number | null
          moderation_level: string | null
          moderators: Json | null
          name: string
          organization_id: string
          rules: Json | null
          slug: string
          total_posts_count: number | null
          updated_at: string
          visibility: string | null
        }
        Insert: {
          allow_guest_posts?: boolean | null
          community_type: string
          created_at?: string
          created_by: string
          cultural_context?: string | null
          current_member_count?: number | null
          description?: string | null
          geographic_focus?: Json | null
          guidelines?: string | null
          id?: string
          is_active?: boolean | null
          join_approval_required?: boolean | null
          language_primary?: string | null
          languages_supported?: Json | null
          max_members?: number | null
          moderation_level?: string | null
          moderators?: Json | null
          name: string
          organization_id: string
          rules?: Json | null
          slug: string
          total_posts_count?: number | null
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          allow_guest_posts?: boolean | null
          community_type?: string
          created_at?: string
          created_by?: string
          cultural_context?: string | null
          current_member_count?: number | null
          description?: string | null
          geographic_focus?: Json | null
          guidelines?: string | null
          id?: string
          is_active?: boolean | null
          join_approval_required?: boolean | null
          language_primary?: string | null
          languages_supported?: Json | null
          max_members?: number | null
          moderation_level?: string | null
          moderators?: Json | null
          name?: string
          organization_id?: string
          rules?: Json | null
          slug?: string
          total_posts_count?: number | null
          updated_at?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communities_created_by_user_profiles_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communities_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_records: {
        Row: {
          consent_type: string
          consent_version: string
          granted: boolean
          granted_at: string
          id: string
          metadata: Json
          organization_id: string
          user_id: string
        }
        Insert: {
          consent_type: string
          consent_version: string
          granted: boolean
          granted_at?: string
          id?: string
          metadata?: Json
          organization_id: string
          user_id: string
        }
        Update: {
          consent_type?: string
          consent_version?: string
          granted?: boolean
          granted_at?: string
          id?: string
          metadata?: Json
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          audience_segment: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          organization: string | null
          status: string | null
        }
        Insert: {
          audience_segment: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          organization?: string | null
          status?: string | null
        }
        Update: {
          audience_segment?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          organization?: string | null
          status?: string | null
        }
        Relationships: []
      }
      content_analytics: {
        Row: {
          content_item_id: string
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          content_item_id: string
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          content_item_id?: string
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_analytics_content_item_id_content_items_id_fk"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_analytics_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_categories: {
        Row: {
          apest_relevance: Json | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          keywords: Json | null
          meta_description: string | null
          movement_relevance_score: number | null
          name: string
          order_index: number | null
          organization_id: string
          parent_id: string | null
          slug: string
          theological_discipline: string | null
          updated_at: string
        }
        Insert: {
          apest_relevance?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: Json | null
          meta_description?: string | null
          movement_relevance_score?: number | null
          name: string
          order_index?: number | null
          organization_id: string
          parent_id?: string | null
          slug: string
          theological_discipline?: string | null
          updated_at?: string
        }
        Update: {
          apest_relevance?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: Json | null
          meta_description?: string | null
          movement_relevance_score?: number | null
          name?: string
          order_index?: number | null
          organization_id?: string
          parent_id?: string | null
          slug?: string
          theological_discipline?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_categories_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_categories_parent_id_content_categories_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_email_deliveries: {
        Row: {
          channel: string
          content_item_id: string
          created_at: string
          error_message: string | null
          id: string
          idempotency_key: string
          organization_id: string
          resend_message_id: string | null
          sent_at: string | null
          status: string
          subscriber_email: string
          subscriber_id: string
          updated_at: string
        }
        Insert: {
          channel?: string
          content_item_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          idempotency_key: string
          organization_id: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
          subscriber_email: string
          subscriber_id: string
          updated_at?: string
        }
        Update: {
          channel?: string
          content_item_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          idempotency_key?: string
          organization_id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
          subscriber_email?: string
          subscriber_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_email_deliveries_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_email_deliveries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_email_deliveries_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "newsletter_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      content_form_templates: {
        Row: {
          created_at: string
          description: string
          form_key: string
          id: string
          length_guidance: string
          name: string
          organization_id: string
          structure: string
          tone_notes: string
          updated_at: string
          voice_adjustments: string
        }
        Insert: {
          created_at?: string
          description: string
          form_key: string
          id?: string
          length_guidance: string
          name: string
          organization_id: string
          structure: string
          tone_notes: string
          updated_at?: string
          voice_adjustments: string
        }
        Update: {
          created_at?: string
          description?: string
          form_key?: string
          id?: string
          length_guidance?: string
          name?: string
          organization_id?: string
          structure?: string
          tone_notes?: string
          updated_at?: string
          voice_adjustments?: string
        }
        Relationships: []
      }
      content_items: {
        Row: {
          access_level: string
          ai_enhanced: boolean | null
          ai_key_points: Json | null
          ai_summary: string | null
          attachments: Json | null
          attribution_required: boolean | null
          audio_url: string | null
          author_id: string
          bookmark_count: number | null
          canonical_url: string | null
          co_authors: Json | null
          comment_count: number | null
          comments_enabled: boolean
          content: string | null
          content_type: string
          created_at: string
          cross_reference_count: number | null
          duration_seconds: number | null
          email_sent_at: string | null
          episode_number: number | null
          estimated_reading_time: number | null
          event_capacity: number | null
          event_end_date: string | null
          event_location: string | null
          event_meeting_url: string | null
          event_price: number | null
          event_registration_url: string | null
          event_start_date: string | null
          event_type: string | null
          excerpt: string | null
          featured_image_url: string | null
          format: string | null
          id: string
          license_type: string | null
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          network_amplification_score: number | null
          organization_id: string
          original_source: string | null
          primary_category_id: string | null
          published_at: string | null
          scheduled_at: string | null
          search_vector: string | null
          season_number: number | null
          secondary_categories: Json | null
          series_id: string | null
          series_order: number | null
          share_count: number | null
          slug: string
          status: string | null
          tags: Json | null
          testimonial_author: string | null
          testimonial_image_url: string | null
          testimonial_organization: string | null
          testimonial_rating: number | null
          testimonial_role: string | null
          testimonial_type: string | null
          theological_themes: Json | null
          title: string
          transcript: string | null
          updated_at: string
          video_url: string | null
          view_count: number | null
          visibility: string | null
          word_count: number | null
        }
        Insert: {
          access_level?: string
          ai_enhanced?: boolean | null
          ai_key_points?: Json | null
          ai_summary?: string | null
          attachments?: Json | null
          attribution_required?: boolean | null
          audio_url?: string | null
          author_id: string
          bookmark_count?: number | null
          canonical_url?: string | null
          co_authors?: Json | null
          comment_count?: number | null
          comments_enabled?: boolean
          content?: string | null
          content_type: string
          created_at?: string
          cross_reference_count?: number | null
          duration_seconds?: number | null
          email_sent_at?: string | null
          episode_number?: number | null
          estimated_reading_time?: number | null
          event_capacity?: number | null
          event_end_date?: string | null
          event_location?: string | null
          event_meeting_url?: string | null
          event_price?: number | null
          event_registration_url?: string | null
          event_start_date?: string | null
          event_type?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          format?: string | null
          id?: string
          license_type?: string | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          network_amplification_score?: number | null
          organization_id: string
          original_source?: string | null
          primary_category_id?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          search_vector?: string | null
          season_number?: number | null
          secondary_categories?: Json | null
          series_id?: string | null
          series_order?: number | null
          share_count?: number | null
          slug: string
          status?: string | null
          tags?: Json | null
          testimonial_author?: string | null
          testimonial_image_url?: string | null
          testimonial_organization?: string | null
          testimonial_rating?: number | null
          testimonial_role?: string | null
          testimonial_type?: string | null
          theological_themes?: Json | null
          title: string
          transcript?: string | null
          updated_at?: string
          video_url?: string | null
          view_count?: number | null
          visibility?: string | null
          word_count?: number | null
        }
        Update: {
          access_level?: string
          ai_enhanced?: boolean | null
          ai_key_points?: Json | null
          ai_summary?: string | null
          attachments?: Json | null
          attribution_required?: boolean | null
          audio_url?: string | null
          author_id?: string
          bookmark_count?: number | null
          canonical_url?: string | null
          co_authors?: Json | null
          comment_count?: number | null
          comments_enabled?: boolean
          content?: string | null
          content_type?: string
          created_at?: string
          cross_reference_count?: number | null
          duration_seconds?: number | null
          email_sent_at?: string | null
          episode_number?: number | null
          estimated_reading_time?: number | null
          event_capacity?: number | null
          event_end_date?: string | null
          event_location?: string | null
          event_meeting_url?: string | null
          event_price?: number | null
          event_registration_url?: string | null
          event_start_date?: string | null
          event_type?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          format?: string | null
          id?: string
          license_type?: string | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          network_amplification_score?: number | null
          organization_id?: string
          original_source?: string | null
          primary_category_id?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          search_vector?: string | null
          season_number?: number | null
          secondary_categories?: Json | null
          series_id?: string | null
          series_order?: number | null
          share_count?: number | null
          slug?: string
          status?: string | null
          tags?: Json | null
          testimonial_author?: string | null
          testimonial_image_url?: string | null
          testimonial_organization?: string | null
          testimonial_rating?: number | null
          testimonial_role?: string | null
          testimonial_type?: string | null
          theological_themes?: Json | null
          title?: string
          transcript?: string | null
          updated_at?: string
          video_url?: string | null
          view_count?: number | null
          visibility?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_items_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_items_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_items_primary_category_id_content_categories_id_fk"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_template_placement: {
        Row: {
          placement: string | null
          template_slug: string
          template_title: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          placement?: string | null
          template_slug: string
          template_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          placement?: string | null
          template_slug?: string
          template_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      content_templates: {
        Row: {
          author_id: string
          category: string | null
          content_type: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          is_public: boolean | null
          name: string
          organization_id: string | null
          slug: string
          tags: Json | null
          template_data: Json
          updated_at: string
          usage_count: number | null
          version: string | null
        }
        Insert: {
          author_id: string
          category?: string | null
          content_type: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_public?: boolean | null
          name: string
          organization_id?: string | null
          slug: string
          tags?: Json | null
          template_data: Json
          updated_at?: string
          usage_count?: number | null
          version?: string | null
        }
        Update: {
          author_id?: string
          category?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          is_public?: boolean | null
          name?: string
          organization_id?: string | null
          slug?: string
          tags?: Json | null
          template_data?: Json
          updated_at?: string
          usage_count?: number | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_templates_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_templates_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          change_summary: string | null
          change_type: string | null
          changed_by: string | null
          character_count: number | null
          content: string | null
          content_item_id: string
          created_at: string
          excerpt: string | null
          id: string
          organization_id: string
          title: string
          version_number: number
          word_count: number | null
        }
        Insert: {
          change_summary?: string | null
          change_type?: string | null
          changed_by?: string | null
          character_count?: number | null
          content?: string | null
          content_item_id: string
          created_at?: string
          excerpt?: string | null
          id?: string
          organization_id: string
          title: string
          version_number: number
          word_count?: number | null
        }
        Update: {
          change_summary?: string | null
          change_type?: string | null
          changed_by?: string | null
          character_count?: number | null
          content?: string | null
          content_item_id?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          organization_id?: string
          title?: string
          version_number?: number
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_changed_by_user_profiles_id_fk"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_content_item_id_content_items_id_fk"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      content_workflows: {
        Row: {
          assigned_to: string | null
          content_item_id: string
          created_at: string
          due_date: string | null
          id: string
          notes: string | null
          priority: string | null
          reviewer_id: string | null
          status: string
          updated_at: string
          workflow_data: Json | null
        }
        Insert: {
          assigned_to?: string | null
          content_item_id: string
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          reviewer_id?: string | null
          status: string
          updated_at?: string
          workflow_data?: Json | null
        }
        Update: {
          assigned_to?: string | null
          content_item_id?: string
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          reviewer_id?: string | null
          status?: string
          updated_at?: string
          workflow_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "content_workflows_assigned_to_user_profiles_id_fk"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_workflows_content_item_id_content_items_id_fk"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_workflows_reviewer_id_user_profiles_id_fk"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      context_snapshots: {
        Row: {
          categories: Json | null
          created_at: string
          expires_at: string | null
          id: string
          interpretive_summary: string
          redacted_data: Json | null
          snapshot_type: string
          user_id: string
          version: number
        }
        Insert: {
          categories?: Json | null
          created_at?: string
          expires_at?: string | null
          id?: string
          interpretive_summary: string
          redacted_data?: Json | null
          snapshot_type: string
          user_id: string
          version?: number
        }
        Update: {
          categories?: Json | null
          created_at?: string
          expires_at?: string | null
          id?: string
          interpretive_summary?: string
          redacted_data?: Json | null
          snapshot_type?: string
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "context_snapshots_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_bindings: {
        Row: {
          created_at: string
          filter_defaults: Json
          id: string
          metadata: Json
          organization_id: string
          provider: string
          provider_resource_id: string | null
          provider_secondary_id: string | null
          slug: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          filter_defaults?: Json
          id?: string
          metadata?: Json
          organization_id: string
          provider: string
          provider_resource_id?: string | null
          provider_secondary_id?: string | null
          slug: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          filter_defaults?: Json
          id?: string
          metadata?: Json
          organization_id?: string
          provider?: string
          provider_resource_id?: string | null
          provider_secondary_id?: string | null
          slug?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_bindings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      corpus_review_items: {
        Row: {
          id: string
          item_type: string
          leader_feedback: Json | null
          movemental_compiled_data: Json
          organization_id: string
          reviewed_at: string | null
          reviewed_by_user_id: string | null
          status: string
        }
        Insert: {
          id?: string
          item_type: string
          leader_feedback?: Json | null
          movemental_compiled_data: Json
          organization_id: string
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
          status?: string
        }
        Update: {
          id?: string
          item_type?: string
          leader_feedback?: Json | null
          movemental_compiled_data?: Json
          organization_id?: string
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "corpus_review_items_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          applicable_to: Json | null
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          id: string
          max_uses: number | null
          min_purchase: number | null
          status: string | null
          updated_at: string
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applicable_to?: Json | null
          code: string
          created_at?: string
          discount_type: string
          discount_value: number
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          status?: string | null
          updated_at?: string
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applicable_to?: Json | null
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          status?: string | null
          updated_at?: string
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      course_announcements: {
        Row: {
          author_id: string
          content: string
          course_id: string
          created_at: string
          id: string
          scheduled_at: string | null
          send_email: boolean | null
          send_in_app: boolean | null
          sent_at: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          course_id: string
          created_at?: string
          id?: string
          scheduled_at?: string | null
          send_email?: boolean | null
          send_in_app?: boolean | null
          sent_at?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          course_id?: string
          created_at?: string
          id?: string
          scheduled_at?: string | null
          send_email?: boolean | null
          send_in_app?: boolean | null
          sent_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_announcements_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_announcements_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_assignments: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          instructions: string | null
          lesson_id: string | null
          max_score: number | null
          rubric: Json | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          instructions?: string | null
          lesson_id?: string | null
          max_score?: number | null
          rubric?: Json | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          instructions?: string | null
          lesson_id?: string | null
          max_score?: number | null
          rubric?: Json | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_assignments_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_assignments_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_bundles: {
        Row: {
          course_ids: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
          price_usd: number
          sale_price_usd: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          course_ids?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price_usd: number
          sale_price_usd?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          course_ids?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price_usd?: number
          sale_price_usd?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_drip_schedules: {
        Row: {
          course_id: string
          created_at: string
          id: string
          lesson_id: string
          release_date: string | null
          release_days: number | null
          release_type: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          lesson_id: string
          release_date?: string | null
          release_days?: number | null
          release_type: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          lesson_id?: string
          release_date?: string | null
          release_days?: number | null
          release_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_drip_schedules_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_drip_schedules_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          amount_paid: number | null
          certificate_id: string | null
          certificate_issued: boolean | null
          certificate_issued_at: string | null
          certificate_url: string | null
          cohort_id: string | null
          completed_at: string | null
          completed_lessons: number | null
          course_id: string
          created_at: string
          enrolled_at: string | null
          enrollment_type: string
          id: string
          last_accessed_at: string | null
          last_accessed_lesson_id: string | null
          limiting_factor: string | null
          progress_data: Json | null
          progress_percentage: number | null
          residency_project_id: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          track_assignment: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_paid?: number | null
          certificate_id?: string | null
          certificate_issued?: boolean | null
          certificate_issued_at?: string | null
          certificate_url?: string | null
          cohort_id?: string | null
          completed_at?: string | null
          completed_lessons?: number | null
          course_id: string
          created_at?: string
          enrolled_at?: string | null
          enrollment_type: string
          id?: string
          last_accessed_at?: string | null
          last_accessed_lesson_id?: string | null
          limiting_factor?: string | null
          progress_data?: Json | null
          progress_percentage?: number | null
          residency_project_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          track_assignment?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number | null
          certificate_id?: string | null
          certificate_issued?: boolean | null
          certificate_issued_at?: string | null
          certificate_url?: string | null
          cohort_id?: string | null
          completed_at?: string | null
          completed_lessons?: number | null
          course_id?: string
          created_at?: string
          enrolled_at?: string | null
          enrollment_type?: string
          id?: string
          last_accessed_at?: string | null
          last_accessed_lesson_id?: string | null
          limiting_factor?: string | null
          progress_data?: Json | null
          progress_percentage?: number | null
          residency_project_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          track_assignment?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_last_accessed_lesson_id_course_lessons_id_fk"
            columns: ["last_accessed_lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_lessons: {
        Row: {
          attachments: Json | null
          audio_id: string | null
          audio_url: string | null
          content: string | null
          content_item_id: string | null
          content_source: string | null
          content_type: string
          course_id: string
          created_at: string
          description: string | null
          embed_code: string | null
          field_experiment_id: string | null
          id: string
          is_preview: boolean | null
          journal_prompt_id: string | null
          lesson_number: number
          media_id: string | null
          module_id: string | null
          module_number: number
          module_type: string | null
          nav_title: string | null
          organization_id: string
          resources: Json | null
          section_order: number | null
          section_type: string | null
          slug: string
          status: string | null
          title: string
          transcript: string | null
          updated_at: string
          video_duration_seconds: number | null
          video_id: string | null
          video_url: string | null
          week_id: string | null
          week_number: number | null
        }
        Insert: {
          attachments?: Json | null
          audio_id?: string | null
          audio_url?: string | null
          content?: string | null
          content_item_id?: string | null
          content_source?: string | null
          content_type: string
          course_id: string
          created_at?: string
          description?: string | null
          embed_code?: string | null
          field_experiment_id?: string | null
          id?: string
          is_preview?: boolean | null
          journal_prompt_id?: string | null
          lesson_number: number
          media_id?: string | null
          module_id?: string | null
          module_number: number
          module_type?: string | null
          nav_title?: string | null
          organization_id: string
          resources?: Json | null
          section_order?: number | null
          section_type?: string | null
          slug: string
          status?: string | null
          title: string
          transcript?: string | null
          updated_at?: string
          video_duration_seconds?: number | null
          video_id?: string | null
          video_url?: string | null
          week_id?: string | null
          week_number?: number | null
        }
        Update: {
          attachments?: Json | null
          audio_id?: string | null
          audio_url?: string | null
          content?: string | null
          content_item_id?: string | null
          content_source?: string | null
          content_type?: string
          course_id?: string
          created_at?: string
          description?: string | null
          embed_code?: string | null
          field_experiment_id?: string | null
          id?: string
          is_preview?: boolean | null
          journal_prompt_id?: string | null
          lesson_number?: number
          media_id?: string | null
          module_id?: string | null
          module_number?: number
          module_type?: string | null
          nav_title?: string | null
          organization_id?: string
          resources?: Json | null
          section_order?: number | null
          section_type?: string | null
          slug?: string
          status?: string | null
          title?: string
          transcript?: string | null
          updated_at?: string
          video_duration_seconds?: number | null
          video_id?: string | null
          video_url?: string | null
          week_id?: string | null
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          module_number: number
          order_index: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          module_number: number
          order_index: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          module_number?: number
          order_index?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_outcomes: {
        Row: {
          affecting_elements: Json | null
          affecting_gifts: Json | null
          course_id: string
          created_at: string
          description: string
          documented_at: string | null
          enrollment_id: string
          id: string
          impact_level: string | null
          metadata: Json | null
          outcome_type: string
          related_goal_id: string | null
          related_practice_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          affecting_elements?: Json | null
          affecting_gifts?: Json | null
          course_id: string
          created_at?: string
          description: string
          documented_at?: string | null
          enrollment_id: string
          id?: string
          impact_level?: string | null
          metadata?: Json | null
          outcome_type: string
          related_goal_id?: string | null
          related_practice_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          affecting_elements?: Json | null
          affecting_gifts?: Json | null
          course_id?: string
          created_at?: string
          description?: string
          documented_at?: string | null
          enrollment_id?: string
          id?: string
          impact_level?: string | null
          metadata?: Json | null
          outcome_type?: string
          related_goal_id?: string | null
          related_practice_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_outcomes_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_outcomes_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_outcomes_related_practice_id_formation_practice_assignme"
            columns: ["related_practice_id"]
            isOneToOne: false
            referencedRelation: "formation_practice_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_outcomes_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_personalization: {
        Row: {
          adaptations: Json | null
          assessment_id: string | null
          baseline_scores: Json
          created_at: string
          current_scores: Json | null
          enrollment_id: string
          focus_elements: Json | null
          id: string
          limiting_factor: string
          personalized_pathway: Json | null
          track_assignment: string | null
          updated_at: string
        }
        Insert: {
          adaptations?: Json | null
          assessment_id?: string | null
          baseline_scores: Json
          created_at?: string
          current_scores?: Json | null
          enrollment_id: string
          focus_elements?: Json | null
          id?: string
          limiting_factor: string
          personalized_pathway?: Json | null
          track_assignment?: string | null
          updated_at?: string
        }
        Update: {
          adaptations?: Json | null
          assessment_id?: string | null
          baseline_scores?: Json
          created_at?: string
          current_scores?: Json | null
          enrollment_id?: string
          focus_elements?: Json | null
          id?: string
          limiting_factor?: string
          personalized_pathway?: Json | null
          track_assignment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_personalization_assessment_id_user_assessments_id_fk"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_personalization_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      course_playbook_pages: {
        Row: {
          body_markdown: string
          course_id: string
          created_at: string
          id: string
          nav_group: string | null
          organization_id: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
          week_number: number | null
        }
        Insert: {
          body_markdown?: string
          course_id: string
          created_at?: string
          id?: string
          nav_group?: string | null
          organization_id: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          week_number?: number | null
        }
        Update: {
          body_markdown?: string
          course_id?: string
          created_at?: string
          id?: string
          nav_group?: string | null
          organization_id?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_playbook_pages_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_playbook_pages_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_prerequisites: {
        Row: {
          course_id: string
          created_at: string
          id: string
          required_course_id: string | null
          required_lesson_id: string | null
          requirement_type: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          required_course_id?: string | null
          required_lesson_id?: string | null
          requirement_type: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          required_course_id?: string | null
          required_lesson_id?: string | null
          requirement_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_prerequisites_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_prerequisites_required_course_id_courses_id_fk"
            columns: ["required_course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_prerequisites_required_lesson_id_course_lessons_id_fk"
            columns: ["required_lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progression_rules: {
        Row: {
          completion_requirement: string | null
          course_id: string
          created_at: string
          id: string
          lesson_id: string | null
          required_lesson_ids: Json | null
          unlock_type: string
          updated_at: string
        }
        Insert: {
          completion_requirement?: string | null
          course_id: string
          created_at?: string
          id?: string
          lesson_id?: string | null
          required_lesson_ids?: Json | null
          unlock_type?: string
          updated_at?: string
        }
        Update: {
          completion_requirement?: string | null
          course_id?: string
          created_at?: string
          id?: string
          lesson_id?: string | null
          required_lesson_ids?: Json | null
          unlock_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progression_rules_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_progression_rules_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sales_pages: {
        Row: {
          course_id: string
          created_at: string
          cta_text: string | null
          faqs: Json | null
          id: string
          sections: Json | null
          testimonials: Json | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          cta_text?: string | null
          faqs?: Json | null
          id?: string
          sections?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          cta_text?: string | null
          faqs?: Json | null
          id?: string
          sections?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sales_pages_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_weeks: {
        Row: {
          course_id: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          objectives: Json | null
          order_index: number
          organization_id: string
          slug: string | null
          theme: string | null
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          course_id: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          objectives?: Json | null
          order_index: number
          organization_id: string
          slug?: string | null
          theme?: string | null
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          course_id?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          objectives?: Json | null
          order_index?: number
          organization_id?: string
          slug?: string | null
          theme?: string | null
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_weeks_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_weeks_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          access_type: string | null
          author_id: string
          certificate_enabled: boolean | null
          certificate_requires_completion: boolean | null
          certificate_template_id: string | null
          cohort_size: number | null
          course_type: string | null
          cover_image_url: string | null
          created_at: string
          description: string
          difficulty_level: string | null
          duration_weeks: number | null
          estimated_hours: number | null
          id: string
          language: string | null
          learning_outcomes: Json | null
          lessons_count: number | null
          max_students: number | null
          meta_description: string | null
          meta_title: string | null
          organization_id: string
          phase_type: string | null
          portal_themes: Json | null
          price_usd: number
          primary_category_id: string | null
          published_at: string | null
          sale_ends_at: string | null
          sale_price_usd: number | null
          slug: string
          status: string | null
          structure_type: string | null
          student_count: number | null
          subtitle: string | null
          tags: Json | null
          title: string
          trailer_video_url: string | null
          updated_at: string
        }
        Insert: {
          access_type?: string | null
          author_id: string
          certificate_enabled?: boolean | null
          certificate_requires_completion?: boolean | null
          certificate_template_id?: string | null
          cohort_size?: number | null
          course_type?: string | null
          cover_image_url?: string | null
          created_at?: string
          description: string
          difficulty_level?: string | null
          duration_weeks?: number | null
          estimated_hours?: number | null
          id?: string
          language?: string | null
          learning_outcomes?: Json | null
          lessons_count?: number | null
          max_students?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id: string
          phase_type?: string | null
          portal_themes?: Json | null
          price_usd?: number
          primary_category_id?: string | null
          published_at?: string | null
          sale_ends_at?: string | null
          sale_price_usd?: number | null
          slug: string
          status?: string | null
          structure_type?: string | null
          student_count?: number | null
          subtitle?: string | null
          tags?: Json | null
          title: string
          trailer_video_url?: string | null
          updated_at?: string
        }
        Update: {
          access_type?: string | null
          author_id?: string
          certificate_enabled?: boolean | null
          certificate_requires_completion?: boolean | null
          certificate_template_id?: string | null
          cohort_size?: number | null
          course_type?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string
          difficulty_level?: string | null
          duration_weeks?: number | null
          estimated_hours?: number | null
          id?: string
          language?: string | null
          learning_outcomes?: Json | null
          lessons_count?: number | null
          max_students?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id?: string
          phase_type?: string | null
          portal_themes?: Json | null
          price_usd?: number
          primary_category_id?: string | null
          published_at?: string | null
          sale_ends_at?: string | null
          sale_price_usd?: number | null
          slug?: string
          status?: string | null
          structure_type?: string | null
          student_count?: number | null
          subtitle?: string | null
          tags?: Json | null
          title?: string
          trailer_video_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_primary_category_id_content_categories_id_fk"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      credibility_rubrics: {
        Row: {
          created_at: string
          critical_constraints: string | null
          dimensions: Json
          id: string
          instructions_template: string
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          critical_constraints?: string | null
          dimensions: Json
          id?: string
          instructions_template: string
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          critical_constraints?: string | null
          dimensions?: Json
          id?: string
          instructions_template?: string
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      digital_badges: {
        Row: {
          badge_type: string
          certificate_id: string | null
          created_at: string
          criteria: Json | null
          description: string | null
          entity_id: string | null
          entity_type: string | null
          expires_at: string | null
          icon_url: string | null
          id: string
          is_public: boolean | null
          issued_at: string
          metadata: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          badge_type: string
          certificate_id?: string | null
          created_at?: string
          criteria?: Json | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          issued_at?: string
          metadata?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          badge_type?: string
          certificate_id?: string | null
          created_at?: string
          criteria?: Json | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          icon_url?: string | null
          id?: string
          is_public?: boolean | null
          issued_at?: string
          metadata?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "digital_badges_certificate_id_certificates_id_fk"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "digital_badges_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      discernment_processes: {
        Row: {
          confidence_level: string | null
          created_at: string
          decided_at: string | null
          decision_outcome: string | null
          decision_type: string
          id: string
          kairos_moment_id: string | null
          metadata: Json | null
          participants: Json | null
          process_description: string | null
          question: string
          reflection_text: string | null
          related_vocation_id: string | null
          started_at: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence_level?: string | null
          created_at?: string
          decided_at?: string | null
          decision_outcome?: string | null
          decision_type: string
          id?: string
          kairos_moment_id?: string | null
          metadata?: Json | null
          participants?: Json | null
          process_description?: string | null
          question: string
          reflection_text?: string | null
          related_vocation_id?: string | null
          started_at?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence_level?: string | null
          created_at?: string
          decided_at?: string | null
          decision_outcome?: string | null
          decision_type?: string
          id?: string
          kairos_moment_id?: string | null
          metadata?: Json | null
          participants?: Json | null
          process_description?: string | null
          question?: string
          reflection_text?: string | null
          related_vocation_id?: string | null
          started_at?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      discussion_prompts: {
        Row: {
          block_order: number | null
          course_id: string | null
          created_at: string
          id: string
          lesson_id: string | null
          prompt: string
          prompt_type: string
          title: string
          updated_at: string
        }
        Insert: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          prompt: string
          prompt_type: string
          title: string
          updated_at?: string
        }
        Update: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          prompt?: string
          prompt_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_prompts_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_prompts_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaign: string | null
          created_at: string
          currency: string | null
          designation: string | null
          donation_type: string | null
          donor_user_id: string | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          payment_method: string | null
          payment_status: string | null
          receipt_sent: boolean | null
          receipt_url: string | null
          refund_amount: number | null
          refunded_at: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          tax_deductible: boolean | null
          updated_at: string
        }
        Insert: {
          amount: number
          campaign?: string | null
          created_at?: string
          currency?: string | null
          designation?: string | null
          donation_type?: string | null
          donor_user_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          receipt_sent?: boolean | null
          receipt_url?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          tax_deductible?: boolean | null
          updated_at?: string
        }
        Update: {
          amount?: number
          campaign?: string | null
          created_at?: string
          currency?: string | null
          designation?: string | null
          donation_type?: string | null
          donor_user_id?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          payment_status?: string | null
          receipt_sent?: boolean | null
          receipt_url?: string | null
          refund_amount?: number | null
          refunded_at?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          tax_deductible?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_user_id_user_profiles_id_fk"
            columns: ["donor_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dual_intelligence_assessments: {
        Row: {
          assessment_version: string
          audience_context: string
          created_at: string
          email: string | null
          id: string
          likert_scores: Json
          organization_id: string
          result_payload: Json
          situation_id: string
          succession_note: string | null
        }
        Insert: {
          assessment_version?: string
          audience_context: string
          created_at?: string
          email?: string | null
          id?: string
          likert_scores: Json
          organization_id: string
          result_payload: Json
          situation_id: string
          succession_note?: string | null
        }
        Update: {
          assessment_version?: string
          audience_context?: string
          created_at?: string
          email?: string | null
          id?: string
          likert_scores?: Json
          organization_id?: string
          result_payload?: Json
          situation_id?: string
          succession_note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dual_intel_assessments_org_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dual_intelligence_assessments_organization_id_organizations_id_"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      editor_insertions: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          selection_id: string
          target_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          selection_id: string
          target_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          selection_id?: string
          target_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "editor_insertions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editor_insertions_selection_id_fkey"
            columns: ["selection_id"]
            isOneToOne: false
            referencedRelation: "reference_selections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editor_insertions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaign_deliveries: {
        Row: {
          campaign_id: string
          channel: string
          created_at: string
          error_message: string | null
          id: string
          idempotency_key: string
          organization_id: string
          resend_message_id: string | null
          sent_at: string | null
          status: string
          subscriber_email: string
          subscriber_id: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          idempotency_key: string
          organization_id: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
          subscriber_email: string
          subscriber_id: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          idempotency_key?: string
          organization_id?: string
          resend_message_id?: string | null
          sent_at?: string | null
          status?: string
          subscriber_email?: string
          subscriber_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_deliveries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_deliveries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaign_deliveries_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "newsletter_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          audience: string
          body_html: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          organization_id: string
          preview_text: string | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          audience?: string
          body_html: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          organization_id: string
          preview_text?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          audience?: string
          body_html?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          organization_id?: string
          preview_text?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          category: string | null
          created_at: string
          id: string
          name: string
          status: string | null
          subject: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          body: string
          category?: string | null
          created_at?: string
          id?: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          body?: string
          category?: string | null
          created_at?: string
          id?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          notes: string | null
          payment_amount: number | null
          payment_status: string | null
          registration_date: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          registration_date?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          registration_date?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_content_items_id_fk"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_completions: {
        Row: {
          completed_at: string
          created_at: string
          deliverable: string | null
          enrollment_id: string
          exercise_id: string
          id: string
          reflection: string | null
          updated_at: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          deliverable?: string | null
          enrollment_id: string
          exercise_id: string
          id?: string
          reflection?: string | null
          updated_at?: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          deliverable?: string | null
          enrollment_id?: string
          exercise_id?: string
          id?: string
          reflection?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_completions_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_completions_exercise_id_exercises_id_fk"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          block_order: number | null
          course_id: string | null
          created_at: string
          deliverables: string | null
          description: string | null
          estimated_time_minutes: number | null
          id: string
          instructions: string
          lesson_id: string | null
          purpose: string | null
          title: string
          updated_at: string
        }
        Insert: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          deliverables?: string | null
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          instructions: string
          lesson_id?: string | null
          purpose?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          deliverables?: string | null
          description?: string | null
          estimated_time_minutes?: number | null
          id?: string
          instructions?: string
          lesson_id?: string | null
          purpose?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      field_experiments: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          enrollment_id: string
          evidence: Json | null
          experiment_type: string | null
          id: string
          instructions: string | null
          lesson_id: string
          outcomes: string | null
          reflection: string | null
          reviewed_by: string | null
          started_at: string | null
          status: string | null
          success_criteria: string | null
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          enrollment_id: string
          evidence?: Json | null
          experiment_type?: string | null
          id?: string
          instructions?: string | null
          lesson_id: string
          outcomes?: string | null
          reflection?: string | null
          reviewed_by?: string | null
          started_at?: string | null
          status?: string | null
          success_criteria?: string | null
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          enrollment_id?: string
          evidence?: Json | null
          experiment_type?: string | null
          id?: string
          instructions?: string | null
          lesson_id?: string
          outcomes?: string | null
          reflection?: string | null
          reviewed_by?: string | null
          started_at?: string | null
          status?: string | null
          success_criteria?: string | null
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "field_experiments_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_experiments_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_experiments_reviewed_by_user_profiles_id_fk"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_checkins: {
        Row: {
          checkin_date: string
          checkin_type: string
          created_at: string
          id: string
          insights: string | null
          metadata: Json | null
          next_steps: string | null
          obstacles: string | null
          progress_rating: number | null
          reflection: string | null
          related_entity_id: string | null
          related_entity_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          checkin_date?: string
          checkin_type: string
          created_at?: string
          id?: string
          insights?: string | null
          metadata?: Json | null
          next_steps?: string | null
          obstacles?: string | null
          progress_rating?: number | null
          reflection?: string | null
          related_entity_id?: string | null
          related_entity_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          checkin_date?: string
          checkin_type?: string
          created_at?: string
          id?: string
          insights?: string | null
          metadata?: Json | null
          next_steps?: string | null
          obstacles?: string | null
          progress_rating?: number | null
          reflection?: string | null
          related_entity_id?: string | null
          related_entity_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_checkins_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_experiments: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          experiment_type: string
          id: string
          learnings: string | null
          metadata: Json | null
          outcomes: string | null
          related_context_id: string | null
          related_goal_id: string | null
          started_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          experiment_type: string
          id?: string
          learnings?: string | null
          metadata?: Json | null
          outcomes?: string | null
          related_context_id?: string | null
          related_goal_id?: string | null
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          experiment_type?: string
          id?: string
          learnings?: string | null
          metadata?: Json | null
          outcomes?: string | null
          related_context_id?: string | null
          related_goal_id?: string | null
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_experiments_related_goal_id_formation_goals_id_fk"
            columns: ["related_goal_id"]
            isOneToOne: false
            referencedRelation: "formation_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formation_experiments_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_goals: {
        Row: {
          created_at: string
          description: string | null
          goal_type: string
          id: string
          metadata: Json | null
          progress_notes: string | null
          related_element: string | null
          status: string
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          goal_type: string
          id?: string
          metadata?: Json | null
          progress_notes?: string | null
          related_element?: string | null
          status?: string
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          goal_type?: string
          id?: string
          metadata?: Json | null
          progress_notes?: string | null
          related_element?: string | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_goals_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_practice_assignments: {
        Row: {
          assignment_data: Json
          assignment_type: string
          created_at: string
          id: string
          organization_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_data: Json
          assignment_type: string
          created_at?: string
          id?: string
          organization_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_data?: Json
          assignment_type?: string
          created_at?: string
          id?: string
          organization_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_practice_assignments_organization_id_organizations_id"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_practice_completions: {
        Row: {
          assignment_id: string
          completed_at: string | null
          created_at: string
          id: string
          insights_gained: string | null
          obstacles_encountered: string | null
          reflection_text: string | null
          week_number: number
        }
        Insert: {
          assignment_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          insights_gained?: string | null
          obstacles_encountered?: string | null
          reflection_text?: string | null
          week_number: number
        }
        Update: {
          assignment_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          insights_gained?: string | null
          obstacles_encountered?: string | null
          reflection_text?: string | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "formation_practice_completions_assignment_id_formation_practice"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "formation_practice_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      front_end_templates: {
        Row: {
          created_at: string
          default_recommendation_weight: number
          description: string
          design_tokens: Json
          hero_config: Json
          id: string
          preview_manifest: Json
          published_at: string | null
          slug: string
          sort_order: number
          status: string
          stitch_project_id: string | null
          stitch_screen_refs: Json | null
          subtitle: string | null
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_recommendation_weight?: number
          description: string
          design_tokens?: Json
          hero_config?: Json
          id?: string
          preview_manifest?: Json
          published_at?: string | null
          slug: string
          sort_order?: number
          status?: string
          stitch_project_id?: string | null
          stitch_screen_refs?: Json | null
          subtitle?: string | null
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_recommendation_weight?: number
          description?: string
          design_tokens?: Json
          hero_config?: Json
          id?: string
          preview_manifest?: Json
          published_at?: string | null
          slug?: string
          sort_order?: number
          status?: string
          stitch_project_id?: string | null
          stitch_screen_refs?: Json | null
          subtitle?: string | null
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      future_plan_ratifications: {
        Row: {
          board_chair_name: string | null
          board_chair_signature: string | null
          facilitator_name: string | null
          future_plan_id: string
          id: string
          notes: string | null
          ratified_at: string
          ratified_by_user_id: string | null
          signed_at: string | null
          submitted_at: string
          version_id: string
        }
        Insert: {
          board_chair_name?: string | null
          board_chair_signature?: string | null
          facilitator_name?: string | null
          future_plan_id: string
          id?: string
          notes?: string | null
          ratified_at?: string
          ratified_by_user_id?: string | null
          signed_at?: string | null
          submitted_at?: string
          version_id: string
        }
        Update: {
          board_chair_name?: string | null
          board_chair_signature?: string | null
          facilitator_name?: string | null
          future_plan_id?: string
          id?: string
          notes?: string | null
          ratified_at?: string
          ratified_by_user_id?: string | null
          signed_at?: string | null
          submitted_at?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "future_plan_ratifications_future_plan_id_fkey"
            columns: ["future_plan_id"]
            isOneToOne: false
            referencedRelation: "future_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "future_plan_ratifications_ratified_by_user_id_fkey"
            columns: ["ratified_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "future_plan_ratifications_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "future_plan_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      future_plan_versions: {
        Row: {
          content_snapshot: Json
          created_at: string
          edited_by_user_id: string | null
          future_plan_id: string
          id: string
          note: string | null
          section_slug: string | null
          version_number: number
        }
        Insert: {
          content_snapshot?: Json
          created_at?: string
          edited_by_user_id?: string | null
          future_plan_id: string
          id?: string
          note?: string | null
          section_slug?: string | null
          version_number: number
        }
        Update: {
          content_snapshot?: Json
          created_at?: string
          edited_by_user_id?: string | null
          future_plan_id?: string
          id?: string
          note?: string | null
          section_slug?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "future_plan_versions_edited_by_user_id_fkey"
            columns: ["edited_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "future_plan_versions_future_plan_id_fkey"
            columns: ["future_plan_id"]
            isOneToOne: false
            referencedRelation: "future_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      future_plans: {
        Row: {
          cohort_id: string | null
          content: Json
          created_at: string
          current_version: number
          id: string
          organization_id: string
          status: string
          updated_at: string
        }
        Insert: {
          cohort_id?: string | null
          content?: Json
          created_at?: string
          current_version?: number
          id?: string
          organization_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          cohort_id?: string | null
          content?: Json
          created_at?: string
          current_version?: number
          id?: string
          organization_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "future_plans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      guided_queue_items: {
        Row: {
          completed_at: string | null
          created_at: string
          dependencies: Json
          description: string | null
          done_criteria: Json
          draft_body: string
          draft_title: string
          id: string
          item_type: Database["public"]["Enums"]["guided_item_type"]
          organization_id: string
          pedagogy_key: string | null
          sort_order: number
          source_id: string
          spine_position: number
          started_at: string | null
          state: Database["public"]["Enums"]["guided_item_state"]
          title: string
          updated_at: string
          user_id: string
          verb: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          dependencies?: Json
          description?: string | null
          done_criteria?: Json
          draft_body?: string
          draft_title?: string
          id?: string
          item_type: Database["public"]["Enums"]["guided_item_type"]
          organization_id: string
          pedagogy_key?: string | null
          sort_order?: number
          source_id: string
          spine_position?: number
          started_at?: string | null
          state?: Database["public"]["Enums"]["guided_item_state"]
          title: string
          updated_at?: string
          user_id: string
          verb?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          dependencies?: Json
          description?: string | null
          done_criteria?: Json
          draft_body?: string
          draft_title?: string
          id?: string
          item_type?: Database["public"]["Enums"]["guided_item_type"]
          organization_id?: string
          pedagogy_key?: string | null
          sort_order?: number
          source_id?: string
          spine_position?: number
          started_at?: string | null
          state?: Database["public"]["Enums"]["guided_item_state"]
          title?: string
          updated_at?: string
          user_id?: string
          verb?: string
        }
        Relationships: []
      }
      guided_session_visits: {
        Row: {
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          organization_id: string
          queue_item_id: string
          started_at: string
          target_minutes: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          organization_id: string
          queue_item_id: string
          started_at?: string
          target_minutes?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          organization_id?: string
          queue_item_id?: string
          started_at?: string
          target_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guided_session_visits_queue_item_id_fkey"
            columns: ["queue_item_id"]
            isOneToOne: false
            referencedRelation: "guided_queue_items"
            referencedColumns: ["id"]
          },
        ]
      }
      handoff_events: {
        Row: {
          context: Json | null
          from_agent: string
          id: string
          reason: string | null
          sermon_preparation_id: string | null
          timestamp: string
          to_agent: string
        }
        Insert: {
          context?: Json | null
          from_agent: string
          id?: string
          reason?: string | null
          sermon_preparation_id?: string | null
          timestamp?: string
          to_agent: string
        }
        Update: {
          context?: Json | null
          from_agent?: string
          id?: string
          reason?: string | null
          sermon_preparation_id?: string | null
          timestamp?: string
          to_agent?: string
        }
        Relationships: [
          {
            foreignKeyName: "handoff_events_sermon_preparation_id_sermon_preparations_id_fk"
            columns: ["sermon_preparation_id"]
            isOneToOne: false
            referencedRelation: "sermon_preparations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrity_diagnostic_submissions: {
        Row: {
          answers: Json
          closing_note: string | null
          created_at: string
          diagnostic_version: string
          email: string
          follow_ups: Json | null
          id: string
          name: string
          organization_id: string
          organization_name: string | null
          role: string | null
          status: string | null
        }
        Insert: {
          answers: Json
          closing_note?: string | null
          created_at?: string
          diagnostic_version?: string
          email: string
          follow_ups?: Json | null
          id?: string
          name: string
          organization_id: string
          organization_name?: string | null
          role?: string | null
          status?: string | null
        }
        Update: {
          answers?: Json
          closing_note?: string | null
          created_at?: string
          diagnostic_version?: string
          email?: string
          follow_ups?: Json | null
          id?: string
          name?: string
          organization_id?: string
          organization_name?: string | null
          role?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integrity_diagnostic_submissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_cohorts: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          id: string
          kickoff_at: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          kickoff_at?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          kickoff_at?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      kairos_moments: {
        Row: {
          created_at: string
          description: string
          formation_impact: string | null
          id: string
          metadata: Json | null
          moment_type: string
          occurred_at: string
          reflection_text: string | null
          related_assessment_id: string | null
          related_experiment_id: string | null
          related_goal_id: string | null
          significance_level: string | null
          tags: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          formation_impact?: string | null
          id?: string
          metadata?: Json | null
          moment_type: string
          occurred_at: string
          reflection_text?: string | null
          related_assessment_id?: string | null
          related_experiment_id?: string | null
          related_goal_id?: string | null
          significance_level?: string | null
          tags?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          formation_impact?: string | null
          id?: string
          metadata?: Json | null
          moment_type?: string
          occurred_at?: string
          reflection_text?: string | null
          related_assessment_id?: string | null
          related_experiment_id?: string | null
          related_goal_id?: string | null
          significance_level?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kairos_moments_related_assessment_id_user_assessments_id_fk"
            columns: ["related_assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kairos_moments_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leader_applications: {
        Row: {
          audience_size: string
          content_type: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          referral_name: string | null
          referral_source: string | null
          status: string | null
          website_url: string
        }
        Insert: {
          audience_size: string
          content_type: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          referral_name?: string | null
          referral_source?: string | null
          status?: string | null
          website_url: string
        }
        Update: {
          audience_size?: string
          content_type?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          referral_name?: string | null
          referral_source?: string | null
          status?: string | null
          website_url?: string
        }
        Relationships: []
      }
      leader_revision_requests: {
        Row: {
          addressed_at: string | null
          created_at: string
          id: string
          leader_id: string
          request_text: string
          requester_email: string
          section: string
          status: string
        }
        Insert: {
          addressed_at?: string | null
          created_at?: string
          id?: string
          leader_id: string
          request_text: string
          requester_email: string
          section: string
          status?: string
        }
        Update: {
          addressed_at?: string | null
          created_at?: string
          id?: string
          leader_id?: string
          request_text?: string
          requester_email?: string
          section?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "leader_revision_requests_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          cohort_participation: boolean | null
          completed_at: string | null
          created_at: string
          enrollment_id: string
          experiment_completed: boolean | null
          id: string
          lesson_id: string
          notes: string | null
          progress_percentage: number | null
          reflection_submitted: boolean | null
          status: string | null
          time_spent_seconds: number | null
          updated_at: string
        }
        Insert: {
          cohort_participation?: boolean | null
          completed_at?: string | null
          created_at?: string
          enrollment_id: string
          experiment_completed?: boolean | null
          id?: string
          lesson_id: string
          notes?: string | null
          progress_percentage?: number | null
          reflection_submitted?: boolean | null
          status?: string | null
          time_spent_seconds?: number | null
          updated_at?: string
        }
        Update: {
          cohort_participation?: boolean | null
          completed_at?: string | null
          created_at?: string
          enrollment_id?: string
          experiment_completed?: boolean | null
          id?: string
          lesson_id?: string
          notes?: string | null
          progress_percentage?: number | null
          reflection_submitted?: boolean | null
          status?: string | null
          time_spent_seconds?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          alt_text: string | null
          author_id: string
          caption: string | null
          created_at: string
          dominant_color: string | null
          folder: string | null
          height: number | null
          id: string
          is_starred: boolean | null
          metadata: Json | null
          mime_type: string
          name: string
          organization_id: string
          original_name: string
          size: number
          tags: Json | null
          thumbnail_url: string | null
          type: string
          updated_at: string
          url: string
          usage_count: number | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          author_id: string
          caption?: string | null
          created_at?: string
          dominant_color?: string | null
          folder?: string | null
          height?: number | null
          id?: string
          is_starred?: boolean | null
          metadata?: Json | null
          mime_type: string
          name: string
          organization_id: string
          original_name: string
          size: number
          tags?: Json | null
          thumbnail_url?: string | null
          type: string
          updated_at?: string
          url: string
          usage_count?: number | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          author_id?: string
          caption?: string | null
          created_at?: string
          dominant_color?: string | null
          folder?: string | null
          height?: number | null
          id?: string
          is_starred?: boolean | null
          metadata?: Json | null
          mime_type?: string
          name?: string
          organization_id?: string
          original_name?: string
          size?: number
          tags?: Json | null
          thumbnail_url?: string | null
          type?: string
          updated_at?: string
          url?: string
          usage_count?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_items_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_items_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      media_usage_tracking: {
        Row: {
          content_item_id: string | null
          content_type: string | null
          created_at: string
          id: string
          media_item_id: string
          updated_at: string
          usage_context: Json | null
          usage_type: string
        }
        Insert: {
          content_item_id?: string | null
          content_type?: string | null
          created_at?: string
          id?: string
          media_item_id: string
          updated_at?: string
          usage_context?: Json | null
          usage_type: string
        }
        Update: {
          content_item_id?: string | null
          content_type?: string | null
          created_at?: string
          id?: string
          media_item_id?: string
          updated_at?: string
          usage_context?: Json | null
          usage_type?: string
        }
        Relationships: []
      }
      movement_leader_applications: {
        Row: {
          bio_long: string
          email: string
          full_name: string
          id: string
          organizational_affiliation_notes: string | null
          photo_url: string | null
          primary_organization: string | null
          primary_role: string
          references_json: Json
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by_user_id: string | null
          source_referrer: string | null
          status: Database["public"]["Enums"]["movement_leader_application_status"]
          submitted_at: string
          why_movement_leader: string
        }
        Insert: {
          bio_long: string
          email: string
          full_name: string
          id?: string
          organizational_affiliation_notes?: string | null
          photo_url?: string | null
          primary_organization?: string | null
          primary_role: string
          references_json?: Json
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
          source_referrer?: string | null
          status?: Database["public"]["Enums"]["movement_leader_application_status"]
          submitted_at?: string
          why_movement_leader: string
        }
        Update: {
          bio_long?: string
          email?: string
          full_name?: string
          id?: string
          organizational_affiliation_notes?: string | null
          photo_url?: string | null
          primary_organization?: string | null
          primary_role?: string
          references_json?: Json
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
          source_referrer?: string | null
          status?: Database["public"]["Enums"]["movement_leader_application_status"]
          submitted_at?: string
          why_movement_leader?: string
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_applications_reviewed_by_user_id_fkey"
            columns: ["reviewed_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_corpus_data: {
        Row: {
          articles: Json
          audio: Json
          biography: Json
          books: Json
          calling_profile: Json
          corpus_slug: string
          endorsements: Json
          frameworks: Json
          id: string
          identity: Json
          last_synced_at: string
          manifest: Json | null
          movement_leader_id: string
          network: Json
          organizations: Json
          quotes: Json
          reflected_understanding_md: string | null
          source_version: string | null
          substrate_md: string | null
          substrate_sections: Json
          theology: Json
          videos: Json
          voice_analysis: Json
        }
        Insert: {
          articles?: Json
          audio?: Json
          biography?: Json
          books?: Json
          calling_profile?: Json
          corpus_slug: string
          endorsements?: Json
          frameworks?: Json
          id?: string
          identity?: Json
          last_synced_at?: string
          manifest?: Json | null
          movement_leader_id: string
          network?: Json
          organizations?: Json
          quotes?: Json
          reflected_understanding_md?: string | null
          source_version?: string | null
          substrate_md?: string | null
          substrate_sections?: Json
          theology?: Json
          videos?: Json
          voice_analysis?: Json
        }
        Update: {
          articles?: Json
          audio?: Json
          biography?: Json
          books?: Json
          calling_profile?: Json
          corpus_slug?: string
          endorsements?: Json
          frameworks?: Json
          id?: string
          identity?: Json
          last_synced_at?: string
          manifest?: Json | null
          movement_leader_id?: string
          network?: Json
          organizations?: Json
          quotes?: Json
          reflected_understanding_md?: string | null
          source_version?: string | null
          substrate_md?: string | null
          substrate_sections?: Json
          theology?: Json
          videos?: Json
          voice_analysis?: Json
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_corpus_data_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: true
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_generated: {
        Row: {
          content: string
          generated_at: string
          id: string
          leader_id: string
          model_version: string
          section: string
        }
        Insert: {
          content: string
          generated_at?: string
          id?: string
          leader_id: string
          model_version: string
          section: string
        }
        Update: {
          content?: string
          generated_at?: string
          id?: string
          leader_id?: string
          model_version?: string
          section?: string
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_generated_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_generated_content: {
        Row: {
          content: string
          generated_at: string
          id: string
          model_version: string | null
          movement_leader_id: string
          section: string
          source_corpus_version: string | null
          superseded_at: string | null
        }
        Insert: {
          content: string
          generated_at?: string
          id?: string
          model_version?: string | null
          movement_leader_id: string
          section: string
          source_corpus_version?: string | null
          superseded_at?: string | null
        }
        Update: {
          content?: string
          generated_at?: string
          id?: string
          model_version?: string | null
          movement_leader_id?: string
          section?: string
          source_corpus_version?: string | null
          superseded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_generated_content_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_public_page_versions: {
        Row: {
          bio_long: string | null
          bio_short: string | null
          created_at: string
          created_by_email: string | null
          hero_image_url: string | null
          id: string
          logo_url: string | null
          movement_leader_id: string
          notes: string | null
          personal_piece: string | null
          photo_url: string | null
          publication_name: string | null
          social_links: Json
          version_number: number
        }
        Insert: {
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          created_by_email?: string | null
          hero_image_url?: string | null
          id?: string
          logo_url?: string | null
          movement_leader_id: string
          notes?: string | null
          personal_piece?: string | null
          photo_url?: string | null
          publication_name?: string | null
          social_links?: Json
          version_number: number
        }
        Update: {
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          created_by_email?: string | null
          hero_image_url?: string | null
          id?: string
          logo_url?: string | null
          movement_leader_id?: string
          notes?: string | null
          personal_piece?: string | null
          photo_url?: string | null
          publication_name?: string | null
          social_links?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_public_page_versions_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_public_pages: {
        Row: {
          approved_at: string | null
          approved_by_movement_leader_email: string | null
          created_at: string
          current_version: number
          id: string
          movement_leader_id: string
          published_at: string | null
          unpublished_at: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by_movement_leader_email?: string | null
          created_at?: string
          current_version?: number
          id?: string
          movement_leader_id: string
          published_at?: string | null
          unpublished_at?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by_movement_leader_email?: string | null
          created_at?: string
          current_version?: number
          id?: string
          movement_leader_id?: string
          published_at?: string | null
          unpublished_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_public_pages_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: true
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_revision_requests: {
        Row: {
          addressed_at: string | null
          addressed_by_user_id: string | null
          created_at: string
          id: string
          movement_leader_id: string
          request_text: string
          requester_email: string
          resolution_notes: string | null
          section: string
          status: Database["public"]["Enums"]["movement_leader_revision_request_status"]
        }
        Insert: {
          addressed_at?: string | null
          addressed_by_user_id?: string | null
          created_at?: string
          id?: string
          movement_leader_id: string
          request_text: string
          requester_email: string
          resolution_notes?: string | null
          section: string
          status?: Database["public"]["Enums"]["movement_leader_revision_request_status"]
        }
        Update: {
          addressed_at?: string | null
          addressed_by_user_id?: string | null
          created_at?: string
          id?: string
          movement_leader_id?: string
          request_text?: string
          requester_email?: string
          resolution_notes?: string | null
          section?: string
          status?: Database["public"]["Enums"]["movement_leader_revision_request_status"]
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_revision_requests_addressed_by_user_id_fkey"
            columns: ["addressed_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movement_leader_revision_requests_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_roster: {
        Row: {
          added_at: string
          added_by: string | null
          cohort_wave: string | null
          display_name: string
          id: string
          notes: string | null
          primary_email: string
          roster_status: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          added_at?: string
          added_by?: string | null
          cohort_wave?: string | null
          display_name: string
          id?: string
          notes?: string | null
          primary_email: string
          roster_status?: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          added_at?: string
          added_by?: string | null
          cohort_wave?: string | null
          display_name?: string
          id?: string
          notes?: string | null
          primary_email?: string
          roster_status?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_roster_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_signings: {
        Row: {
          document_slug: string
          document_version: string
          id: string
          ip_address: unknown
          movement_leader_id: string
          signature_method: Database["public"]["Enums"]["movement_leader_signature_method"]
          signed_at: string
          signed_pdf_url: string | null
        }
        Insert: {
          document_slug: string
          document_version: string
          id?: string
          ip_address?: unknown
          movement_leader_id: string
          signature_method?: Database["public"]["Enums"]["movement_leader_signature_method"]
          signed_at?: string
          signed_pdf_url?: string | null
        }
        Update: {
          document_slug?: string
          document_version?: string
          id?: string
          ip_address?: unknown
          movement_leader_id?: string
          signature_method?: Database["public"]["Enums"]["movement_leader_signature_method"]
          signed_at?: string
          signed_pdf_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_signings_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_welcome_letter_views: {
        Row: {
          acknowledged_at: string | null
          first_viewed_at: string
          id: string
          user_id: string
          welcome_letter_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          first_viewed_at?: string
          id?: string
          user_id: string
          welcome_letter_id: string
        }
        Update: {
          acknowledged_at?: string | null
          first_viewed_at?: string
          id?: string
          user_id?: string
          welcome_letter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_welcome_letter_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movement_leader_welcome_letter_views_welcome_letter_id_fkey"
            columns: ["welcome_letter_id"]
            isOneToOne: false
            referencedRelation: "movement_leader_welcome_letters"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leader_welcome_letters: {
        Row: {
          archived_at: string | null
          body_md: string
          created_at: string
          created_by_user_id: string | null
          first_name: string
          generated_by: string | null
          generation_metadata: Json
          id: string
          movement_leader_id: string
          notes: string | null
          organization_id: string | null
          published_at: string
          signoff: string
          source_corpus_version: string | null
          status: Database["public"]["Enums"]["movement_leader_welcome_letter_status"]
          updated_at: string
          version_number: number
          word_count: number | null
        }
        Insert: {
          archived_at?: string | null
          body_md: string
          created_at?: string
          created_by_user_id?: string | null
          first_name: string
          generated_by?: string | null
          generation_metadata?: Json
          id?: string
          movement_leader_id: string
          notes?: string | null
          organization_id?: string | null
          published_at?: string
          signoff?: string
          source_corpus_version?: string | null
          status?: Database["public"]["Enums"]["movement_leader_welcome_letter_status"]
          updated_at?: string
          version_number?: number
          word_count?: number | null
        }
        Update: {
          archived_at?: string | null
          body_md?: string
          created_at?: string
          created_by_user_id?: string | null
          first_name?: string
          generated_by?: string | null
          generation_metadata?: Json
          id?: string
          movement_leader_id?: string
          notes?: string | null
          organization_id?: string | null
          published_at?: string
          signoff?: string
          source_corpus_version?: string | null
          status?: Database["public"]["Enums"]["movement_leader_welcome_letter_status"]
          updated_at?: string
          version_number?: number
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movement_leader_welcome_letters_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movement_leader_welcome_letters_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movement_leader_welcome_letters_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_leaders: {
        Row: {
          application_id: string | null
          bio_long: string | null
          bio_short: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          personal_piece: string | null
          photo_url: string | null
          primary_organization: string | null
          primary_role: string | null
          reflected_understanding_endorsed_at: string | null
          research_corpus_slug: string | null
          slug: string
          status: Database["public"]["Enums"]["movement_leader_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          application_id?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          personal_piece?: string | null
          photo_url?: string | null
          primary_organization?: string | null
          primary_role?: string | null
          reflected_understanding_endorsed_at?: string | null
          research_corpus_slug?: string | null
          slug: string
          status?: Database["public"]["Enums"]["movement_leader_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          application_id?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          personal_piece?: string | null
          photo_url?: string | null
          primary_organization?: string | null
          primary_role?: string | null
          reflected_understanding_endorsed_at?: string | null
          research_corpus_slug?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["movement_leader_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movement_leaders_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "movement_leader_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhood_exegesis_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          metadata: Json | null
          observation_type: string
          recorded_at: string
          related_context_id: string | null
          tags: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          observation_type: string
          recorded_at?: string
          related_context_id?: string | null
          tags?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          observation_type?: string
          recorded_at?: string
          related_context_id?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "neighborhood_exegesis_entries_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_import_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          dry_run: boolean
          errors: Json
          id: string
          organization_id: string
          post_status: string
          posts_imported: number
          posts_skipped: number
          posts_total: number
          source: string
          started_at: string | null
          status: string
          subscribers_imported: number
          subscribers_skipped: number
          subscribers_total: number
          summary: Json
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dry_run?: boolean
          errors?: Json
          id?: string
          organization_id: string
          post_status?: string
          posts_imported?: number
          posts_skipped?: number
          posts_total?: number
          source?: string
          started_at?: string | null
          status?: string
          subscribers_imported?: number
          subscribers_skipped?: number
          subscribers_total?: number
          summary?: Json
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          dry_run?: boolean
          errors?: Json
          id?: string
          organization_id?: string
          post_status?: string
          posts_imported?: number
          posts_skipped?: number
          posts_total?: number
          source?: string
          started_at?: string | null
          status?: string
          subscribers_imported?: number
          subscribers_skipped?: number
          subscribers_total?: number
          summary?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_import_jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_import_jobs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          organization_id: string
          source: string | null
          status: string
          unsubscribed_at: string | null
          updated_at: string
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          organization_id: string
          source?: string | null
          status?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          organization_id?: string
          source?: string | null
          status?: string
          unsubscribed_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notebook_artifacts: {
        Row: {
          artifact_type: string
          content: string | null
          created_at: string
          id: string
          notebook_id: string
          organization_id: string
          source_ids: string[] | null
          status: string | null
          structured_data: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          artifact_type: string
          content?: string | null
          created_at?: string
          id?: string
          notebook_id: string
          organization_id: string
          source_ids?: string[] | null
          status?: string | null
          structured_data?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          artifact_type?: string
          content?: string | null
          created_at?: string
          id?: string
          notebook_id?: string
          organization_id?: string
          source_ids?: string[] | null
          status?: string | null
          structured_data?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notebook_conversations: {
        Row: {
          anon_id: string | null
          created_at: string
          id: string
          messages: Json | null
          notebook_id: string
          organization_id: string
          session_id: string | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          created_at?: string
          id?: string
          messages?: Json | null
          notebook_id: string
          organization_id: string
          session_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          created_at?: string
          id?: string
          messages?: Json | null
          notebook_id?: string
          organization_id?: string
          session_id?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notebook_source_chunks: {
        Row: {
          chunk_index: number
          content: string
          created_at: string
          embedding: Json | null
          id: string
          metadata: Json | null
          notebook_id: string
          organization_id: string
          source_id: string
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          content: string
          created_at?: string
          embedding?: Json | null
          id?: string
          metadata?: Json | null
          notebook_id: string
          organization_id: string
          source_id: string
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string
          embedding?: Json | null
          id?: string
          metadata?: Json | null
          notebook_id?: string
          organization_id?: string
          source_id?: string
          token_count?: number | null
        }
        Relationships: []
      }
      notebook_sources: {
        Row: {
          content: string | null
          created_at: string
          id: string
          metadata: Json | null
          notebook_id: string
          organization_id: string
          source_type: string
          status: string | null
          storage_path: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          notebook_id: string
          organization_id: string
          source_type: string
          status?: string | null
          storage_path?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          notebook_id?: string
          organization_id?: string
          source_type?: string
          status?: string | null
          storage_path?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      notebooks: {
        Row: {
          anon_id: string | null
          corpus_scope: Json | null
          created_at: string
          description: string | null
          id: string
          notebook_focus: Json | null
          organization_id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          corpus_scope?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          notebook_focus?: Json | null
          organization_id: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          corpus_scope?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          notebook_focus?: Json | null
          organization_id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_deliveries: {
        Row: {
          channel: string
          created_at: string
          id: string
          notification_id: string
          read_at: string | null
          sent_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel: string
          created_at?: string
          id?: string
          notification_id: string
          read_at?: string | null
          sent_at?: string | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          notification_id?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_cohorts: {
        Row: {
          confirmed_at: string | null
          created_at: string
          id: string
          slot_day: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour: number
          status: Database["public"]["Enums"]["onboarding_cohort_status"]
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string
          id?: string
          slot_day: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour: number
          status?: Database["public"]["Enums"]["onboarding_cohort_status"]
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string
          id?: string
          slot_day?: Database["public"]["Enums"]["cohort_slot_day"]
          slot_hour?: number
          status?: Database["public"]["Enums"]["onboarding_cohort_status"]
        }
        Relationships: []
      }
      onboarding_global_content: {
        Row: {
          content_key: string
          id: string
          payload: Json
          updated_at: string
          updated_by_user_id: string | null
        }
        Insert: {
          content_key: string
          id?: string
          payload?: Json
          updated_at?: string
          updated_by_user_id?: string | null
        }
        Update: {
          content_key?: string
          id?: string
          payload?: Json
          updated_at?: string
          updated_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_global_content_updated_by_user_id_fkey"
            columns: ["updated_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_responses: {
        Row: {
          admired_websites: Json | null
          archive_content_to_import: Json | null
          audience_growth_goals: string | null
          audience_needs: string | null
          audience_questions: Json | null
          best_work_content: Json | null
          best_work_selected: Json | null
          bio: string | null
          brand_colors: string | null
          call_availability: Json | null
          collaboration_interests: string | null
          contact_information: Json | null
          content_goals: string | null
          content_sources: Json | null
          created_at: string
          current_content_locations: Json | null
          current_step: string | null
          design_review_preference: string | null
          digital_publishing_concerns: string | null
          domain_ownership: string | null
          email: string
          email_sending_domain: string | null
          existing_blog_urls: Json | null
          feature_preferences: Json | null
          font_preferences: string | null
          id: string
          income_goal: string | null
          is_complete: boolean | null
          movemental_calling: string | null
          movemental_conversation: string | null
          movemental_story: string | null
          network_cross_references: boolean | null
          network_discovery: boolean | null
          network_introduction_preferences: Json | null
          network_participation: boolean | null
          organization_id: string
          payment_processing_preferences: Json | null
          photo_url: string | null
          preferred_domain: string | null
          publishing_cadence: string | null
          quit_risk_factors: string | null
          regular_content_types: Json | null
          site_feel_description: string | null
          social_media_links: Json | null
          style_constraints: Json | null
          submitted_at: string | null
          support_needs: string | null
          target_audience: string | null
          three_year_impact: string | null
          time_per_week: string | null
          timeline_expectations: string | null
          twelve_month_success: string | null
          updated_at: string
          visitor_feeling: string | null
          what_excites_him: string | null
          who_to_reach: string | null
        }
        Insert: {
          admired_websites?: Json | null
          archive_content_to_import?: Json | null
          audience_growth_goals?: string | null
          audience_needs?: string | null
          audience_questions?: Json | null
          best_work_content?: Json | null
          best_work_selected?: Json | null
          bio?: string | null
          brand_colors?: string | null
          call_availability?: Json | null
          collaboration_interests?: string | null
          contact_information?: Json | null
          content_goals?: string | null
          content_sources?: Json | null
          created_at?: string
          current_content_locations?: Json | null
          current_step?: string | null
          design_review_preference?: string | null
          digital_publishing_concerns?: string | null
          domain_ownership?: string | null
          email: string
          email_sending_domain?: string | null
          existing_blog_urls?: Json | null
          feature_preferences?: Json | null
          font_preferences?: string | null
          id?: string
          income_goal?: string | null
          is_complete?: boolean | null
          movemental_calling?: string | null
          movemental_conversation?: string | null
          movemental_story?: string | null
          network_cross_references?: boolean | null
          network_discovery?: boolean | null
          network_introduction_preferences?: Json | null
          network_participation?: boolean | null
          organization_id: string
          payment_processing_preferences?: Json | null
          photo_url?: string | null
          preferred_domain?: string | null
          publishing_cadence?: string | null
          quit_risk_factors?: string | null
          regular_content_types?: Json | null
          site_feel_description?: string | null
          social_media_links?: Json | null
          style_constraints?: Json | null
          submitted_at?: string | null
          support_needs?: string | null
          target_audience?: string | null
          three_year_impact?: string | null
          time_per_week?: string | null
          timeline_expectations?: string | null
          twelve_month_success?: string | null
          updated_at?: string
          visitor_feeling?: string | null
          what_excites_him?: string | null
          who_to_reach?: string | null
        }
        Update: {
          admired_websites?: Json | null
          archive_content_to_import?: Json | null
          audience_growth_goals?: string | null
          audience_needs?: string | null
          audience_questions?: Json | null
          best_work_content?: Json | null
          best_work_selected?: Json | null
          bio?: string | null
          brand_colors?: string | null
          call_availability?: Json | null
          collaboration_interests?: string | null
          contact_information?: Json | null
          content_goals?: string | null
          content_sources?: Json | null
          created_at?: string
          current_content_locations?: Json | null
          current_step?: string | null
          design_review_preference?: string | null
          digital_publishing_concerns?: string | null
          domain_ownership?: string | null
          email?: string
          email_sending_domain?: string | null
          existing_blog_urls?: Json | null
          feature_preferences?: Json | null
          font_preferences?: string | null
          id?: string
          income_goal?: string | null
          is_complete?: boolean | null
          movemental_calling?: string | null
          movemental_conversation?: string | null
          movemental_story?: string | null
          network_cross_references?: boolean | null
          network_discovery?: boolean | null
          network_introduction_preferences?: Json | null
          network_participation?: boolean | null
          organization_id?: string
          payment_processing_preferences?: Json | null
          photo_url?: string | null
          preferred_domain?: string | null
          publishing_cadence?: string | null
          quit_risk_factors?: string | null
          regular_content_types?: Json | null
          site_feel_description?: string | null
          social_media_links?: Json | null
          style_constraints?: Json | null
          submitted_at?: string | null
          support_needs?: string | null
          target_audience?: string | null
          three_year_impact?: string | null
          time_per_week?: string | null
          timeline_expectations?: string | null
          twelve_month_success?: string | null
          updated_at?: string
          visitor_feeling?: string | null
          what_excites_him?: string | null
          who_to_reach?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_responses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_tasks: {
        Row: {
          completed_at: string | null
          completed_by_user_id: string | null
          created_at: string
          id: string
          metadata: Json
          movemental_unlocked: boolean
          organization_id: string
          status: string
          task_key: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          completed_by_user_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          movemental_unlocked?: boolean
          organization_id: string
          status?: string
          task_key: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          completed_by_user_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          movemental_unlocked?: boolean
          organization_id?: string
          status?: string
          task_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_video_progress: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          last_watched_at: string
          onboarding_video_id: string
          organization_id: string
          progress_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          last_watched_at?: string
          onboarding_video_id: string
          organization_id: string
          progress_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          last_watched_at?: string
          onboarding_video_id?: string
          organization_id?: string
          progress_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_video_progress_onboarding_video_id_fkey"
            columns: ["onboarding_video_id"]
            isOneToOne: false
            referencedRelation: "onboarding_videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_video_progress_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_video_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_videos: {
        Row: {
          captions_url: string | null
          created_at: string
          duration_seconds: number | null
          embed_code: string | null
          external_id: string | null
          hosting_provider: string
          id: string
          phase: string | null
          poster_url: string | null
          published: boolean
          slug: string
          sort_order: number
          source_video_id: string | null
          summary: string | null
          task_key: string | null
          thumbnail_url: string | null
          title: string
          transcript: string | null
          updated_at: string
          updated_by_user_id: string | null
          video_url: string | null
        }
        Insert: {
          captions_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          embed_code?: string | null
          external_id?: string | null
          hosting_provider?: string
          id?: string
          phase?: string | null
          poster_url?: string | null
          published?: boolean
          slug: string
          sort_order?: number
          source_video_id?: string | null
          summary?: string | null
          task_key?: string | null
          thumbnail_url?: string | null
          title: string
          transcript?: string | null
          updated_at?: string
          updated_by_user_id?: string | null
          video_url?: string | null
        }
        Update: {
          captions_url?: string | null
          created_at?: string
          duration_seconds?: number | null
          embed_code?: string | null
          external_id?: string | null
          hosting_provider?: string
          id?: string
          phase?: string | null
          poster_url?: string | null
          published?: boolean
          slug?: string
          sort_order?: number
          source_video_id?: string | null
          summary?: string | null
          task_key?: string | null
          thumbnail_url?: string | null
          title?: string
          transcript?: string | null
          updated_at?: string
          updated_by_user_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_videos_source_video_id_fkey"
            columns: ["source_video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboarding_videos_updated_by_user_id_fkey"
            columns: ["updated_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onbuilding_assets: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          created_by: string | null
          height: number | null
          id: string
          kind: string
          mime_type: string
          movement_leader_id: string
          original_name: string
          size_bytes: number
          storage_bucket: string
          storage_path: string
          tags: Json
          title: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          kind?: string
          mime_type: string
          movement_leader_id: string
          original_name: string
          size_bytes?: number
          storage_bucket?: string
          storage_path: string
          tags?: Json
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string | null
          height?: number | null
          id?: string
          kind?: string
          mime_type?: string
          movement_leader_id?: string
          original_name?: string
          size_bytes?: number
          storage_bucket?: string
          storage_path?: string
          tags?: Json
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_assets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_assets_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      onbuilding_profile_sections: {
        Row: {
          body_md: string
          created_at: string
          id: string
          last_edited_at: string | null
          last_edited_by: string | null
          movement_leader_id: string
          ordinal: number
          ratified_at: string | null
          ratified_by: string | null
          section_key: string
          source_section_key: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          body_md?: string
          created_at?: string
          id?: string
          last_edited_at?: string | null
          last_edited_by?: string | null
          movement_leader_id: string
          ordinal?: number
          ratified_at?: string | null
          ratified_by?: string | null
          section_key: string
          source_section_key?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          body_md?: string
          created_at?: string
          id?: string
          last_edited_at?: string | null
          last_edited_by?: string | null
          movement_leader_id?: string
          ordinal?: number
          ratified_at?: string | null
          ratified_by?: string | null
          section_key?: string
          source_section_key?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_profile_sections_last_edited_by_fkey"
            columns: ["last_edited_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_profile_sections_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_profile_sections_ratified_by_fkey"
            columns: ["ratified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onbuilding_ratifications: {
        Row: {
          id: string
          movement_leader_id: string
          note: string | null
          ratified_at: string
          ratified_by: string | null
          scope: string
          section_key: string | null
          snapshot_md: string | null
        }
        Insert: {
          id?: string
          movement_leader_id: string
          note?: string | null
          ratified_at?: string
          ratified_by?: string | null
          scope: string
          section_key?: string | null
          snapshot_md?: string | null
        }
        Update: {
          id?: string
          movement_leader_id?: string
          note?: string | null
          ratified_at?: string
          ratified_by?: string | null
          scope?: string
          section_key?: string | null
          snapshot_md?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_ratifications_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_ratifications_ratified_by_fkey"
            columns: ["ratified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onbuilding_tasks: {
        Row: {
          completed_at: string | null
          completed_by: string | null
          created_at: string
          id: string
          metadata: Json
          movement_leader_id: string
          status: string
          task_key: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          movement_leader_id: string
          status?: string
          task_key: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          movement_leader_id?: string
          status?: string
          task_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_tasks_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_tasks_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
        ]
      }
      onbuilding_template_selection: {
        Row: {
          content_template_id: string | null
          movement_leader_id: string
          selected_at: string
          selected_by: string | null
          template_slug: string
          updated_at: string
        }
        Insert: {
          content_template_id?: string | null
          movement_leader_id: string
          selected_at?: string
          selected_by?: string | null
          template_slug: string
          updated_at?: string
        }
        Update: {
          content_template_id?: string | null
          movement_leader_id?: string
          selected_at?: string
          selected_by?: string | null
          template_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_template_selection_content_template_id_fkey"
            columns: ["content_template_id"]
            isOneToOne: false
            referencedRelation: "content_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_template_selection_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: true
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_template_selection_selected_by_fkey"
            columns: ["selected_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_assets: {
        Row: {
          asset_type: string
          id: string
          metadata: Json
          organization_id: string
          storage_path: string
          uploaded_at: string
          uploaded_by_user_id: string | null
        }
        Insert: {
          asset_type: string
          id?: string
          metadata?: Json
          organization_id: string
          storage_path: string
          uploaded_at?: string
          uploaded_by_user_id?: string | null
        }
        Update: {
          asset_type?: string
          id?: string
          metadata?: Json
          organization_id?: string
          storage_path?: string
          uploaded_at?: string
          uploaded_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_inquiries: {
        Row: {
          budget_range: string | null
          contact_name: string
          created_at: string
          current_tools: Json | null
          email: string
          id: string
          message: string
          org_name: string
          org_type: string
          status: string | null
          team_size: string
          timeline: string
        }
        Insert: {
          budget_range?: string | null
          contact_name: string
          created_at?: string
          current_tools?: Json | null
          email: string
          id?: string
          message: string
          org_name: string
          org_type: string
          status?: string | null
          team_size: string
          timeline: string
        }
        Update: {
          budget_range?: string | null
          contact_name?: string
          created_at?: string
          current_tools?: Json | null
          email?: string
          id?: string
          message?: string
          org_name?: string
          org_type?: string
          status?: string | null
          team_size?: string
          timeline?: string
        }
        Relationships: []
      }
      organization_memberships: {
        Row: {
          created_at: string
          id: string
          invited_at: string | null
          invited_by: string | null
          joined_at: string | null
          organization_id: string
          permissions: Json | null
          role: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string | null
          organization_id: string
          permissions?: Json | null
          role: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string
          permissions?: Json | null
          role?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_memberships_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_template_claims: {
        Row: {
          claimed_at: string
          claimed_by_user_id: string
          disclaimer_accepted_at: string
          id: string
          manifest_version: number | null
          metadata: Json
          organization_id: string
          released_at: string | null
          released_by_user_id: string | null
          template_id: string
          template_slug: string
          viewed_screens: Json | null
        }
        Insert: {
          claimed_at?: string
          claimed_by_user_id: string
          disclaimer_accepted_at: string
          id?: string
          manifest_version?: number | null
          metadata?: Json
          organization_id: string
          released_at?: string | null
          released_by_user_id?: string | null
          template_id: string
          template_slug: string
          viewed_screens?: Json | null
        }
        Update: {
          claimed_at?: string
          claimed_by_user_id?: string
          disclaimer_accepted_at?: string
          id?: string
          manifest_version?: number | null
          metadata?: Json
          organization_id?: string
          released_at?: string | null
          released_by_user_id?: string | null
          template_id?: string
          template_slug?: string
          viewed_screens?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_template_claims_claimed_by_user_id_fkey"
            columns: ["claimed_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_template_claims_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_template_claims_released_by_user_id_fkey"
            columns: ["released_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_template_claims_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "front_end_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          account_owner_id: string | null
          address: Json | null
          billing_email: string | null
          city: string | null
          cohort_id: string | null
          cohort_start_date: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          current_stage: Database["public"]["Enums"]["org_current_stage"]
          custom_domain: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          license_type: string | null
          logo_url: string | null
          max_users: number | null
          member_count: number | null
          name: string
          onboarding_completed_at: string | null
          onboarding_started_at: string | null
          onboarding_state: Json
          organization_type: string
          plan_id: string | null
          settings: Json | null
          size_category: string | null
          slug: string
          status: string | null
          subdomain: string | null
          type: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          account_owner_id?: string | null
          address?: Json | null
          billing_email?: string | null
          city?: string | null
          cohort_id?: string | null
          cohort_start_date?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["org_current_stage"]
          custom_domain?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          license_type?: string | null
          logo_url?: string | null
          max_users?: number | null
          member_count?: number | null
          name: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_state?: Json
          organization_type: string
          plan_id?: string | null
          settings?: Json | null
          size_category?: string | null
          slug: string
          status?: string | null
          subdomain?: string | null
          type?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          account_owner_id?: string | null
          address?: Json | null
          billing_email?: string | null
          city?: string | null
          cohort_id?: string | null
          cohort_start_date?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["org_current_stage"]
          custom_domain?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          license_type?: string | null
          logo_url?: string | null
          max_users?: number | null
          member_count?: number | null
          name?: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_state?: Json
          organization_type?: string
          plan_id?: string | null
          settings?: Json | null
          size_category?: string | null
          slug?: string
          status?: string | null
          subdomain?: string | null
          type?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_account_owner_id_user_profiles_id_fk"
            columns: ["account_owner_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "invitation_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_plan_id_subscription_plans_id_fk"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          city: string | null
          country: string | null
          id: string
          ip_address: string | null
          referrer: string | null
          resource_id: string
          resource_type: string
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          viewed_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          resource_id: string
          resource_type: string
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewed_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          referrer?: string | null
          resource_id?: string
          resource_type?: string
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          viewed_at?: string | null
        }
        Relationships: []
      }
      pathway_sections: {
        Row: {
          body: string | null
          created_at: string
          id: string
          order_index: number | null
          organization_id: string | null
          pathway_id: string
          section_type: string
          slug: string
          status: string | null
          structured: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          order_index?: number | null
          organization_id?: string | null
          pathway_id: string
          section_type: string
          slug: string
          status?: string | null
          structured?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          order_index?: number | null
          organization_id?: string | null
          pathway_id?: string
          section_type?: string
          slug?: string
          status?: string | null
          structured?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pathway_sections_pathway_id_fkey"
            columns: ["pathway_id"]
            isOneToOne: false
            referencedRelation: "pathways"
            referencedColumns: ["id"]
          },
        ]
      }
      pathways: {
        Row: {
          attachments: Json | null
          content_path: string
          created_at: string | null
          description: string | null
          id: string
          inventory_id: string | null
          order_index: number | null
          organization_id: string | null
          placement: string | null
          portal: string | null
          slug: string
          source_type: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          content_path: string
          created_at?: string | null
          description?: string | null
          id?: string
          inventory_id?: string | null
          order_index?: number | null
          organization_id?: string | null
          placement?: string | null
          portal?: string | null
          slug: string
          source_type?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          content_path?: string
          created_at?: string | null
          description?: string | null
          id?: string
          inventory_id?: string | null
          order_index?: number | null
          organization_id?: string | null
          placement?: string | null
          portal?: string | null
          slug?: string
          source_type?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string
          id: string
          measured_at: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          resource_id: string | null
          resource_type: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          measured_at?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          measured_at?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          metric_value?: number
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      podcast_episodes: {
        Row: {
          access_type: string | null
          audio_url: string
          author_id: string | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          episode_number: number | null
          external_id: string | null
          external_url: string | null
          hosting_provider: string | null
          id: string
          listen_count: number | null
          meta_description: string | null
          meta_title: string | null
          organization_id: string
          published_at: string | null
          season_number: number | null
          series_id: string | null
          slug: string
          source_type: string | null
          status: string | null
          tags: Json | null
          thumbnail_url: string | null
          title: string
          transcript: string | null
          updated_at: string
        }
        Insert: {
          access_type?: string | null
          audio_url: string
          author_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          episode_number?: number | null
          external_id?: string | null
          external_url?: string | null
          hosting_provider?: string | null
          id?: string
          listen_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id: string
          published_at?: string | null
          season_number?: number | null
          series_id?: string | null
          slug: string
          source_type?: string | null
          status?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          title: string
          transcript?: string | null
          updated_at?: string
        }
        Update: {
          access_type?: string | null
          audio_url?: string
          author_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          episode_number?: number | null
          external_id?: string | null
          external_url?: string | null
          hosting_provider?: string | null
          id?: string
          listen_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id?: string
          published_at?: string | null
          season_number?: number | null
          series_id?: string | null
          slug?: string
          source_type?: string | null
          status?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          title?: string
          transcript?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "podcast_episodes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "podcast_episodes_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "podcast_series"
            referencedColumns: ["id"]
          },
        ]
      }
      podcast_series: {
        Row: {
          apple_podcasts_url: string | null
          author_id: string
          categories: Json | null
          copyright: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          episode_count: number | null
          explicit: boolean | null
          id: string
          itunes_category: string | null
          itunes_subcategory: string | null
          language: string | null
          name: string
          slug: string
          spotify_url: string | null
          status: string | null
          total_duration_seconds: number | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          apple_podcasts_url?: string | null
          author_id: string
          categories?: Json | null
          copyright?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          episode_count?: number | null
          explicit?: boolean | null
          id?: string
          itunes_category?: string | null
          itunes_subcategory?: string | null
          language?: string | null
          name: string
          slug: string
          spotify_url?: string | null
          status?: string | null
          total_duration_seconds?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          apple_podcasts_url?: string | null
          author_id?: string
          categories?: Json | null
          copyright?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          episode_count?: number | null
          explicit?: boolean | null
          id?: string
          itunes_category?: string | null
          itunes_subcategory?: string | null
          language?: string | null
          name?: string
          slug?: string
          spotify_url?: string | null
          status?: string | null
          total_duration_seconds?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "podcast_series_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      program_engagements: {
        Row: {
          created_at: string
          id: string
          milestones: Json
          organization_id: string
          summary_markdown: string | null
          template_slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          milestones?: Json
          organization_id: string
          summary_markdown?: string | null
          template_slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          milestones?: Json
          organization_id?: string
          summary_markdown?: string | null
          template_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_engagements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_pack_layers: {
        Row: {
          content: string
          created_at: string
          id: string
          layer_key: string
          prompt_pack_id: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          layer_key: string
          prompt_pack_id: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          layer_key?: string
          prompt_pack_id?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_pack_layers_prompt_pack_id_fkey"
            columns: ["prompt_pack_id"]
            isOneToOne: false
            referencedRelation: "prompt_packs"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_packs: {
        Row: {
          created_at: string
          id: string
          label: string | null
          organization_id: string
          slug: string
          status: string | null
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          organization_id: string
          slug: string
          status?: string | null
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          organization_id?: string
          slug?: string
          status?: string | null
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_packs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          city: string | null
          confidence: string | null
          created_at: string
          cross_source_hits: number
          employer: string | null
          enriched_at: string | null
          enrichment_fields: Json
          enrichment_status: string
          fields: Json
          harvest_id: string
          inserted_at: string
          name: string
          name_normalized: string | null
          occupation: string | null
          persona: string | null
          pipeline_stage: string
          pk: number
          score_affinity: number
          score_capacity: number
          score_composite: number
          score_engagement: number
          score_original: number
          score_recency: number
          signal_types: string[]
          sources: string[]
          state: string | null
          tier: number
          zip: string | null
        }
        Insert: {
          city?: string | null
          confidence?: string | null
          created_at?: string
          cross_source_hits?: number
          employer?: string | null
          enriched_at?: string | null
          enrichment_fields?: Json
          enrichment_status?: string
          fields?: Json
          harvest_id: string
          inserted_at?: string
          name: string
          name_normalized?: string | null
          occupation?: string | null
          persona?: string | null
          pipeline_stage?: string
          pk?: never
          score_affinity?: number
          score_capacity?: number
          score_composite?: number
          score_engagement?: number
          score_original?: number
          score_recency?: number
          signal_types?: string[]
          sources?: string[]
          state?: string | null
          tier?: number
          zip?: string | null
        }
        Update: {
          city?: string | null
          confidence?: string | null
          created_at?: string
          cross_source_hits?: number
          employer?: string | null
          enriched_at?: string | null
          enrichment_fields?: Json
          enrichment_status?: string
          fields?: Json
          harvest_id?: string
          inserted_at?: string
          name?: string
          name_normalized?: string | null
          occupation?: string | null
          persona?: string | null
          pipeline_stage?: string
          pk?: never
          score_affinity?: number
          score_capacity?: number
          score_composite?: number
          score_engagement?: number
          score_original?: number
          score_recency?: number
          signal_types?: string[]
          sources?: string[]
          state?: string | null
          tier?: number
          zip?: string | null
        }
        Relationships: []
      }
      publication_recommendations: {
        Row: {
          blurb: string | null
          created_at: string
          id: string
          organization_id: string
          recommended_organization_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          blurb?: string | null
          created_at?: string
          id?: string
          organization_id: string
          recommended_organization_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          blurb?: string | null
          created_at?: string
          id?: string
          organization_id?: string
          recommended_organization_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_recommendations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publication_recommendations_recommended_organization_id_fkey"
            columns: ["recommended_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount_paid: number
          course_id: string | null
          created_at: string
          currency: string | null
          id: string
          invoice_number: string | null
          payment_intent_id: string | null
          payment_method: string | null
          purchased_at: string | null
          receipt_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_paid: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          invoice_number?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          purchased_at?: string | null
          receipt_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          invoice_number?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          purchased_at?: string | null
          receipt_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      question_banks: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          questions: Json | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          questions?: Json | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          questions?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_banks_created_by_user_profiles_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cohort_specific_for: string | null
          created_at: string
          data_sensitivity: string
          description: string
          function: string
          id: string
          published_at: string | null
          recipe_document: string
          slug: string
          title: string
          transcript_excerpt: string | null
          updated_at: string
          video_url: string | null
          working_time_minutes: number
        }
        Insert: {
          cohort_specific_for?: string | null
          created_at?: string
          data_sensitivity: string
          description: string
          function: string
          id?: string
          published_at?: string | null
          recipe_document: string
          slug: string
          title: string
          transcript_excerpt?: string | null
          updated_at?: string
          video_url?: string | null
          working_time_minutes: number
        }
        Update: {
          cohort_specific_for?: string | null
          created_at?: string
          data_sensitivity?: string
          description?: string
          function?: string
          id?: string
          published_at?: string | null
          recipe_document?: string
          slug?: string
          title?: string
          transcript_excerpt?: string | null
          updated_at?: string
          video_url?: string | null
          working_time_minutes?: number
        }
        Relationships: []
      }
      reference_bookmarks: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          selection_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          selection_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          selection_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reference_bookmarks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_bookmarks_selection_id_fkey"
            columns: ["selection_id"]
            isOneToOne: false
            referencedRelation: "reference_selections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reference_selections: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          organization_id: string
          selected_text: string
          source_id: string
          source_label: string
          source_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          organization_id: string
          selected_text: string
          source_id: string
          source_label: string
          source_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          organization_id?: string
          selected_text?: string
          source_id?: string
          source_label?: string
          source_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reference_selections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reference_selections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reflection_journals: {
        Row: {
          created_at: string
          enrollment_id: string
          experiment_outcomes: string | null
          id: string
          journal_prompt: string
          learnings: string | null
          lesson_id: string | null
          next_steps: string | null
          response: string
          reviewed_by: string | null
          submitted_at: string | null
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          experiment_outcomes?: string | null
          id?: string
          journal_prompt: string
          learnings?: string | null
          lesson_id?: string | null
          next_steps?: string | null
          response: string
          reviewed_by?: string | null
          submitted_at?: string | null
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          experiment_outcomes?: string | null
          id?: string
          journal_prompt?: string
          learnings?: string | null
          lesson_id?: string | null
          next_steps?: string | null
          response?: string
          reviewed_by?: string | null
          submitted_at?: string | null
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "reflection_journals_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflection_journals_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflection_journals_reviewed_by_user_profiles_id_fk"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reflection_questions: {
        Row: {
          block_order: number | null
          course_id: string | null
          created_at: string
          guidance: string | null
          id: string
          lesson_id: string | null
          question: string
          question_type: string
          updated_at: string
        }
        Insert: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          guidance?: string | null
          id?: string
          lesson_id?: string | null
          question: string
          question_type: string
          updated_at?: string
        }
        Update: {
          block_order?: number | null
          course_id?: string | null
          created_at?: string
          guidance?: string | null
          id?: string
          lesson_id?: string | null
          question?: string
          question_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reflection_questions_course_id_courses_id_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflection_questions_lesson_id_course_lessons_id_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      reflection_responses: {
        Row: {
          created_at: string
          enrollment_id: string
          id: string
          question_id: string
          response: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enrollment_id: string
          id?: string
          question_id: string
          response: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enrollment_id?: string
          id?: string
          question_id?: string
          response?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reflection_responses_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflection_responses_question_id_reflection_questions_id_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "reflection_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      remotion_drafts: {
        Row: {
          composition_id: string
          created_at: string
          error_message: string | null
          id: string
          organization_id: string
          props: Json | null
          rendered_video_url: string | null
          status: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          composition_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          organization_id: string
          props?: Json | null
          rendered_video_url?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          composition_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          organization_id?: string
          props?: Json | null
          rendered_video_url?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "remotion_drafts_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      residency_projects: {
        Row: {
          coach_id: string | null
          completed_at: string | null
          created_at: string
          deliverables: Json | null
          description: string | null
          enrollment_id: string
          focus_element: string
          id: string
          objectives: Json | null
          outcomes: string | null
          project_type: string | null
          reproduction_evidence: Json | null
          started_at: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          coach_id?: string | null
          completed_at?: string | null
          created_at?: string
          deliverables?: Json | null
          description?: string | null
          enrollment_id: string
          focus_element: string
          id?: string
          objectives?: Json | null
          outcomes?: string | null
          project_type?: string | null
          reproduction_evidence?: Json | null
          started_at?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          coach_id?: string | null
          completed_at?: string | null
          created_at?: string
          deliverables?: Json | null
          description?: string | null
          enrollment_id?: string
          focus_element?: string
          id?: string
          objectives?: Json | null
          outcomes?: string | null
          project_type?: string | null
          reproduction_evidence?: Json | null
          started_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "residency_projects_coach_id_user_profiles_id_fk"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residency_projects_enrollment_id_course_enrollments_id_fk"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_artifact_comments: {
        Row: {
          artifact_id: string
          author_user_id: string | null
          body: string
          clause_ref: string | null
          created_at: string
          guidebook_id: string
          id: string
          parent_id: string | null
          quoted_snippet: string | null
          resolved_at: string | null
          resolved_by_user_id: string | null
          status: Database["public"]["Enums"]["safety_comment_status"]
          updated_at: string
        }
        Insert: {
          artifact_id: string
          author_user_id?: string | null
          body: string
          clause_ref?: string | null
          created_at?: string
          guidebook_id: string
          id?: string
          parent_id?: string | null
          quoted_snippet?: string | null
          resolved_at?: string | null
          resolved_by_user_id?: string | null
          status?: Database["public"]["Enums"]["safety_comment_status"]
          updated_at?: string
        }
        Update: {
          artifact_id?: string
          author_user_id?: string | null
          body?: string
          clause_ref?: string | null
          created_at?: string
          guidebook_id?: string
          id?: string
          parent_id?: string | null
          quoted_snippet?: string | null
          resolved_at?: string | null
          resolved_by_user_id?: string | null
          status?: Database["public"]["Enums"]["safety_comment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_artifact_comments_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "safety_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_comments_author_user_id_fkey"
            columns: ["author_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_comments_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "safety_artifact_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_comments_resolved_by_user_id_fkey"
            columns: ["resolved_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_artifact_publications: {
        Row: {
          artifact_id: string
          id: string
          is_active: boolean
          public_slug: string
          published_at: string
          published_by_user_id: string | null
          version_id: string
        }
        Insert: {
          artifact_id: string
          id?: string
          is_active?: boolean
          public_slug: string
          published_at?: string
          published_by_user_id?: string | null
          version_id: string
        }
        Update: {
          artifact_id?: string
          id?: string
          is_active?: boolean
          public_slug?: string
          published_at?: string
          published_by_user_id?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_artifact_publications_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "safety_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_publications_published_by_user_id_fkey"
            columns: ["published_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_publications_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "safety_artifact_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_artifact_versions: {
        Row: {
          artifact_id: string
          body_md: string
          created_at: string
          created_by_user_id: string | null
          id: string
          version_number: number
        }
        Insert: {
          artifact_id: string
          body_md?: string
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          version_number: number
        }
        Update: {
          artifact_id?: string
          body_md?: string
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "safety_artifact_versions_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "safety_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifact_versions_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_artifacts: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          deck: string | null
          guidebook_id: string | null
          id: string
          kind: string
          layer_order: number | null
          organization_id: string
          review_status: Database["public"]["Enums"]["safety_review_status"]
          slug: string
          status: Database["public"]["Enums"]["safety_artifact_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          deck?: string | null
          guidebook_id?: string | null
          id?: string
          kind?: string
          layer_order?: number | null
          organization_id: string
          review_status?: Database["public"]["Enums"]["safety_review_status"]
          slug: string
          status?: Database["public"]["Enums"]["safety_artifact_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          deck?: string | null
          guidebook_id?: string | null
          id?: string
          kind?: string
          layer_order?: number | null
          organization_id?: string
          review_status?: Database["public"]["Enums"]["safety_review_status"]
          slug?: string
          status?: Database["public"]["Enums"]["safety_artifact_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_artifacts_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifacts_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_artifacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_engagements: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: number
          dashboard_provisioned_at: string | null
          guidebook_id: string | null
          id: string
          kickoff_at: string | null
          milestones: Json
          organization_id: string
          plan: string
          started_at: string
          status: Database["public"]["Enums"]["safety_engagement_status"]
          updated_at: string
          week: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          dashboard_provisioned_at?: string | null
          guidebook_id?: string | null
          id?: string
          kickoff_at?: string | null
          milestones?: Json
          organization_id: string
          plan?: string
          started_at?: string
          status?: Database["public"]["Enums"]["safety_engagement_status"]
          updated_at?: string
          week?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          dashboard_provisioned_at?: string | null
          guidebook_id?: string | null
          id?: string
          kickoff_at?: string | null
          milestones?: Json
          organization_id?: string
          plan?: string
          started_at?: string
          status?: Database["public"]["Enums"]["safety_engagement_status"]
          updated_at?: string
          week?: number
        }
        Relationships: [
          {
            foreignKeyName: "safety_engagements_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_engagements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_enrollments: {
        Row: {
          amount_cents: number
          annual_budget: string | null
          artifact_uploads: Json
          contact_email: string
          contact_name: string
          contact_phone: string | null
          contact_role: string | null
          contributors: Json
          country: string | null
          created_at: string
          currency: string
          current_ai_usage: string | null
          decider_email: string | null
          decider_name: string | null
          decider_role: string | null
          denomination: string | null
          id: string
          leadership_concerns: string | null
          org_name: string
          org_type: string | null
          organization_id: string | null
          paid_at: string | null
          preferred_kickoff_window: string | null
          provisioned_at: string | null
          ratification_process: string | null
          size_text: string | null
          status: Database["public"]["Enums"]["safety_enrollment_status"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          amount_cents?: number
          annual_budget?: string | null
          artifact_uploads?: Json
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          contact_role?: string | null
          contributors?: Json
          country?: string | null
          created_at?: string
          currency?: string
          current_ai_usage?: string | null
          decider_email?: string | null
          decider_name?: string | null
          decider_role?: string | null
          denomination?: string | null
          id?: string
          leadership_concerns?: string | null
          org_name: string
          org_type?: string | null
          organization_id?: string | null
          paid_at?: string | null
          preferred_kickoff_window?: string | null
          provisioned_at?: string | null
          ratification_process?: string | null
          size_text?: string | null
          status?: Database["public"]["Enums"]["safety_enrollment_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          amount_cents?: number
          annual_budget?: string | null
          artifact_uploads?: Json
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          contact_role?: string | null
          contributors?: Json
          country?: string | null
          created_at?: string
          currency?: string
          current_ai_usage?: string | null
          decider_email?: string | null
          decider_name?: string | null
          decider_role?: string | null
          denomination?: string | null
          id?: string
          leadership_concerns?: string | null
          org_name?: string
          org_type?: string | null
          organization_id?: string | null
          paid_at?: string | null
          preferred_kickoff_window?: string | null
          provisioned_at?: string | null
          ratification_process?: string | null
          size_text?: string | null
          status?: Database["public"]["Enums"]["safety_enrollment_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_enrollments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_guidebook_ratifications: {
        Row: {
          board_chair_name: string | null
          board_chair_signature: string | null
          facilitator_name: string | null
          governance_process_note: string | null
          guidebook_id: string
          id: string
          notes: string | null
          ratified_at: string
          ratified_by_user_id: string | null
          signed_at: string | null
          submitted_at: string
          version_number: number
        }
        Insert: {
          board_chair_name?: string | null
          board_chair_signature?: string | null
          facilitator_name?: string | null
          governance_process_note?: string | null
          guidebook_id: string
          id?: string
          notes?: string | null
          ratified_at?: string
          ratified_by_user_id?: string | null
          signed_at?: string | null
          submitted_at?: string
          version_number: number
        }
        Update: {
          board_chair_name?: string | null
          board_chair_signature?: string | null
          facilitator_name?: string | null
          governance_process_note?: string | null
          guidebook_id?: string
          id?: string
          notes?: string | null
          ratified_at?: string
          ratified_by_user_id?: string | null
          signed_at?: string | null
          submitted_at?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "safety_guidebook_ratifications_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_guidebook_ratifications_ratified_by_user_id_fkey"
            columns: ["ratified_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_guidebook_signatures: {
        Row: {
          created_at: string
          guidebook_id: string
          id: string
          signature: string | null
          signed_at: string | null
          signer_name: string
          signer_role: string | null
          signer_user_id: string | null
          status: Database["public"]["Enums"]["safety_signature_status"]
          version_number: number | null
        }
        Insert: {
          created_at?: string
          guidebook_id: string
          id?: string
          signature?: string | null
          signed_at?: string | null
          signer_name: string
          signer_role?: string | null
          signer_user_id?: string | null
          status?: Database["public"]["Enums"]["safety_signature_status"]
          version_number?: number | null
        }
        Update: {
          created_at?: string
          guidebook_id?: string
          id?: string
          signature?: string | null
          signed_at?: string | null
          signer_name?: string
          signer_role?: string | null
          signer_user_id?: string | null
          status?: Database["public"]["Enums"]["safety_signature_status"]
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_guidebook_signatures_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_guidebook_signatures_signer_user_id_fkey"
            columns: ["signer_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_guidebooks: {
        Row: {
          created_at: string
          current_version: number
          engagement_id: string | null
          id: string
          organization_id: string
          ratified_at: string | null
          status: Database["public"]["Enums"]["safety_review_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_version?: number
          engagement_id?: string | null
          id?: string
          organization_id: string
          ratified_at?: string | null
          status?: Database["public"]["Enums"]["safety_review_status"]
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_version?: number
          engagement_id?: string | null
          id?: string
          organization_id?: string
          ratified_at?: string | null
          status?: Database["public"]["Enums"]["safety_review_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_guidebooks_engagement_id_fkey"
            columns: ["engagement_id"]
            isOneToOne: false
            referencedRelation: "safety_engagements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_guidebooks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_layer_checklist_items: {
        Row: {
          artifact_id: string
          created_at: string
          id: string
          is_complete: boolean
          label: string
          sort_order: number
        }
        Insert: {
          artifact_id: string
          created_at?: string
          id?: string
          is_complete?: boolean
          label: string
          sort_order?: number
        }
        Update: {
          artifact_id?: string
          created_at?: string
          id?: string
          is_complete?: boolean
          label?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "safety_layer_checklist_items_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "safety_artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_questions: {
        Row: {
          asked_by_user_id: string | null
          created_at: string
          id: string
          matched_artifact_id: string | null
          matched_clause_ref: string | null
          organization_id: string
          question: string
        }
        Insert: {
          asked_by_user_id?: string | null
          created_at?: string
          id?: string
          matched_artifact_id?: string | null
          matched_clause_ref?: string | null
          organization_id: string
          question: string
        }
        Update: {
          asked_by_user_id?: string | null
          created_at?: string
          id?: string
          matched_artifact_id?: string | null
          matched_clause_ref?: string | null
          organization_id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_questions_asked_by_user_id_fkey"
            columns: ["asked_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_questions_matched_artifact_id_fkey"
            columns: ["matched_artifact_id"]
            isOneToOne: false
            referencedRelation: "safety_artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safety_questions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_role_access: {
        Row: {
          area: string
          can_view: boolean
          id: string
          organization_id: string | null
          role: string
        }
        Insert: {
          area: string
          can_view?: boolean
          id?: string
          organization_id?: string | null
          role: string
        }
        Update: {
          area?: string
          can_view?: boolean
          id?: string
          organization_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_role_access_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_rollout_artifacts: {
        Row: {
          created_at: string
          file_url: string | null
          generated_at: string | null
          guidebook_id: string
          id: string
          kind: Database["public"]["Enums"]["safety_rollout_kind"]
          status: string
          storage_path: string | null
          title: string
        }
        Insert: {
          created_at?: string
          file_url?: string | null
          generated_at?: string | null
          guidebook_id: string
          id?: string
          kind: Database["public"]["Enums"]["safety_rollout_kind"]
          status?: string
          storage_path?: string | null
          title: string
        }
        Update: {
          created_at?: string
          file_url?: string | null
          generated_at?: string | null
          guidebook_id?: string
          id?: string
          kind?: Database["public"]["Enums"]["safety_rollout_kind"]
          status?: string
          storage_path?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_rollout_artifacts_guidebook_id_fkey"
            columns: ["guidebook_id"]
            isOneToOne: false
            referencedRelation: "safety_guidebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_staff_readiness_anonymous_submissions: {
        Row: {
          answers: Json
          created_at: string
          display_name: string
          email: string | null
          id: string
          intake_version: string | null
          invite_id: string
          organization_id: string
          role_or_team: string | null
          submitted_at: string
          updated_at: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          display_name: string
          email?: string | null
          id?: string
          intake_version?: string | null
          invite_id: string
          organization_id: string
          role_or_team?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
          intake_version?: string | null
          invite_id?: string
          organization_id?: string
          role_or_team?: string | null
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_staff_readiness_anonymous_submissi_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sandbox_staff_readiness_anonymous_submissions_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "sandbox_staff_readiness_invites"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_staff_readiness_invites: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          label: string | null
          organization_id: string
          revoked_at: string | null
          token_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          label?: string | null
          organization_id: string
          revoked_at?: string | null
          token_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          label?: string | null
          organization_id?: string
          revoked_at?: string | null
          token_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_staff_readiness_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sandbox_staff_readiness_invites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sandbox_staff_readiness_submissions: {
        Row: {
          answers: Json
          created_at: string
          id: string
          organization_id: string
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          organization_id: string
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          organization_id?: string
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sandbox_staff_readiness_submissions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sandbox_staff_readiness_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_archive_views: {
        Row: {
          created_at: string
          description: string | null
          filters: Json
          id: string
          is_public: boolean | null
          name: string
          share_token: string | null
          updated_at: string
          user_id: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          filters?: Json
          id?: string
          is_public?: boolean | null
          name: string
          share_token?: string | null
          updated_at?: string
          user_id: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          filters?: Json
          id?: string
          is_public?: boolean | null
          name?: string
          share_token?: string | null
          updated_at?: string
          user_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_archive_views_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scripture_books: {
        Row: {
          abbreviation: string
          book_order: number
          chapter_count: number
          created_at: string
          id: string
          name: string
          testament: string
          updated_at: string
        }
        Insert: {
          abbreviation: string
          book_order: number
          chapter_count: number
          created_at?: string
          id?: string
          name: string
          testament: string
          updated_at?: string
        }
        Update: {
          abbreviation?: string
          book_order?: number
          chapter_count?: number
          created_at?: string
          id?: string
          name?: string
          testament?: string
          updated_at?: string
        }
        Relationships: []
      }
      scripture_chapters: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          id: string
          updated_at: string
          verse_count: number
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          id?: string
          updated_at?: string
          verse_count: number
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          id?: string
          updated_at?: string
          verse_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "scripture_chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "scripture_books"
            referencedColumns: ["id"]
          },
        ]
      }
      scripture_verses: {
        Row: {
          book_id: string
          chapter_id: string
          chapter_number: number
          created_at: string
          id: string
          text: string
          updated_at: string
          verse_number: number
        }
        Insert: {
          book_id: string
          chapter_id: string
          chapter_number: number
          created_at?: string
          id?: string
          text: string
          updated_at?: string
          verse_number: number
        }
        Update: {
          book_id?: string
          chapter_id?: string
          chapter_number?: number
          created_at?: string
          id?: string
          text?: string
          updated_at?: string
          verse_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "scripture_verses_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "scripture_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripture_verses_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "scripture_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      search_analytics: {
        Row: {
          clicked_result_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          results_count: number | null
          search_query: string
          searched_at: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          clicked_result_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          results_count?: number | null
          search_query: string
          searched_at?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_result_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          results_count?: number | null
          search_query?: string
          searched_at?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      search_history: {
        Row: {
          clicked_result_id: string | null
          clicked_result_type: string | null
          created_at: string
          id: string
          query: string
          result_count: number | null
          user_id: string
        }
        Insert: {
          clicked_result_id?: string | null
          clicked_result_type?: string | null
          created_at?: string
          id?: string
          query: string
          result_count?: number | null
          user_id: string
        }
        Update: {
          clicked_result_id?: string | null
          clicked_result_type?: string | null
          created_at?: string
          id?: string
          query?: string
          result_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sermon_preparations: {
        Row: {
          biblical_reference: string | null
          content_id: string | null
          created_at: string
          id: string
          status: string
          title: string | null
          updated_at: string
          user_id: string
          workflow_id: string | null
        }
        Insert: {
          biblical_reference?: string | null
          content_id?: string | null
          created_at?: string
          id?: string
          status?: string
          title?: string | null
          updated_at?: string
          user_id: string
          workflow_id?: string | null
        }
        Update: {
          biblical_reference?: string | null
          content_id?: string | null
          created_at?: string
          id?: string
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sermon_preparations_content_id_content_items_id_fk"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sermon_preparations_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      signed_agreements: {
        Row: {
          agreement_type: string
          agreement_version: string
          document_url: string | null
          id: string
          metadata: Json
          organization_id: string
          signed_at: string
          signed_by_user_id: string | null
        }
        Insert: {
          agreement_type: string
          agreement_version: string
          document_url?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          signed_at?: string
          signed_by_user_id?: string | null
        }
        Update: {
          agreement_type?: string
          agreement_version?: string
          document_url?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          signed_at?: string
          signed_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signed_agreements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      site_pages: {
        Row: {
          allowed_component_types: string[] | null
          created_at: string
          entity_id: string | null
          id: string
          organization_id: string
          page_type: string
          published_at: string | null
          puck_data: Json
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          allowed_component_types?: string[] | null
          created_at?: string
          entity_id?: string | null
          id?: string
          organization_id: string
          page_type?: string
          published_at?: string | null
          puck_data?: Json
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          allowed_component_types?: string[] | null
          created_at?: string
          entity_id?: string | null
          id?: string
          organization_id?: string
          page_type?: string
          published_at?: string | null
          puck_data?: Json
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_pages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_users: {
        Row: {
          granted_at: string
          granted_by: string | null
          is_active: boolean
          staff_role: Database["public"]["Enums"]["movemental_staff_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          is_active?: boolean
          staff_role?: Database["public"]["Enums"]["movemental_staff_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          is_active?: boolean
          staff_role?: Database["public"]["Enums"]["movemental_staff_role"]
          user_id?: string
        }
        Relationships: []
      }
      stage_transitions: {
        Row: {
          from_stage: Database["public"]["Enums"]["org_current_stage"] | null
          id: string
          notes: string | null
          organization_id: string
          to_stage: Database["public"]["Enums"]["org_current_stage"]
          transitioned_at: string
          transitioned_by_user_id: string | null
        }
        Insert: {
          from_stage?: Database["public"]["Enums"]["org_current_stage"] | null
          id?: string
          notes?: string | null
          organization_id: string
          to_stage: Database["public"]["Enums"]["org_current_stage"]
          transitioned_at?: string
          transitioned_by_user_id?: string | null
        }
        Update: {
          from_stage?: Database["public"]["Enums"]["org_current_stage"] | null
          id?: string
          notes?: string | null
          organization_id?: string
          to_stage?: Database["public"]["Enums"]["org_current_stage"]
          transitioned_at?: string
          transitioned_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stage_transitions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stage_transitions_transitioned_by_user_id_fkey"
            columns: ["transitioned_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          bandwidth_limit: number | null
          content_access_level: string
          created_at: string
          currency: string | null
          description: string | null
          features: Json
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          max_users: number | null
          name: string
          organization_id: string | null
          plan_type: string
          price_annual: number | null
          price_monthly: number | null
          slug: string
          sort_order: number | null
          storage_limit: number | null
          stripe_price_id_annual: string | null
          stripe_price_id_monthly: string | null
          stripe_product_id: string | null
          trial_days: number | null
          updated_at: string
        }
        Insert: {
          bandwidth_limit?: number | null
          content_access_level: string
          created_at?: string
          currency?: string | null
          description?: string | null
          features: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_users?: number | null
          name: string
          organization_id?: string | null
          plan_type: string
          price_annual?: number | null
          price_monthly?: number | null
          slug: string
          sort_order?: number | null
          storage_limit?: number | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          stripe_product_id?: string | null
          trial_days?: number | null
          updated_at?: string
        }
        Update: {
          bandwidth_limit?: number | null
          content_access_level?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_users?: number | null
          name?: string
          organization_id?: string | null
          plan_type?: string
          price_annual?: number | null
          price_monthly?: number | null
          slug?: string
          sort_order?: number | null
          storage_limit?: number | null
          stripe_price_id_annual?: string | null
          stripe_price_id_monthly?: string | null
          stripe_product_id?: string | null
          trial_days?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_plans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      system_readiness_assessments: {
        Row: {
          assessment_version: string
          audience_context: string
          bottleneck_note: string | null
          created_at: string
          email: string | null
          id: string
          likert_scores: Json
          organization_id: string
          reality_situation: string
          result_payload: Json
        }
        Insert: {
          assessment_version?: string
          audience_context: string
          bottleneck_note?: string | null
          created_at?: string
          email?: string | null
          id?: string
          likert_scores: Json
          organization_id: string
          reality_situation: string
          result_payload: Json
        }
        Update: {
          assessment_version?: string
          audience_context?: string
          bottleneck_note?: string | null
          created_at?: string
          email?: string | null
          id?: string
          likert_scores?: Json
          organization_id?: string
          reality_situation?: string
          result_payload?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_readiness_assessments_org_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_readiness_assessments_organization_id_organizations_id_f"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_jobs: {
        Row: {
          batch_id: string | null
          created_at: string
          error_message: string | null
          id: string
          input_file_name: string | null
          input_file_path: string | null
          organization_id: string
          output_file_path: string | null
          output_file_url: string | null
          source_language: string | null
          status: string
          target_language: string
          updated_at: string
          user_id: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_file_name?: string | null
          input_file_path?: string | null
          organization_id: string
          output_file_path?: string | null
          output_file_url?: string | null
          source_language?: string | null
          status?: string
          target_language: string
          updated_at?: string
          user_id: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          input_file_name?: string | null
          input_file_path?: string | null
          organization_id?: string
          output_file_path?: string | null
          output_file_url?: string | null
          source_language?: string | null
          status?: string
          target_language?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "translation_jobs_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translation_jobs_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_assessments: {
        Row: {
          ai_insights: string | null
          apostolic_environment_level: number | null
          apostolic_environment_score: number | null
          apostolic_score: number | null
          assessment_context: Json | null
          assessment_id: string
          complementary_gifts: Json | null
          completed_at: string | null
          completion_percentage: number | null
          completion_time: number | null
          confidence_level: number | null
          created_at: string
          cultural_adjustment_applied: boolean | null
          cultural_adjustment_factor: number | null
          disciple_making_level: number | null
          disciple_making_score: number | null
          element_scores: Json | null
          evangelistic_score: number | null
          geometric_mean: number | null
          id: string
          jesus_is_lord_level: number | null
          jesus_is_lord_score: number | null
          liminality_communitas_level: number | null
          liminality_communitas_score: number | null
          limiting_factor: string | null
          lordship_gate_applied: boolean | null
          max_possible_score: number | null
          missional_incarnational_level: number | null
          missional_incarnational_score: number | null
          normalized_scores: Json | null
          organic_systems_level: number | null
          organic_systems_score: number | null
          organization_id: string
          overall_maturity_label: string | null
          overall_maturity_level: number | null
          personalized_recommendations: Json | null
          primary_gift: string | null
          prophetic_score: number | null
          raw_scores: Json | null
          response_consistency: number | null
          secondary_gift: string | null
          shepherding_score: number | null
          sprint_pathway: Json | null
          sprint_progress: Json | null
          sprint_start_date: string | null
          started_at: string | null
          suggested_peers: Json | null
          teaching_score: number | null
          total_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_insights?: string | null
          apostolic_environment_level?: number | null
          apostolic_environment_score?: number | null
          apostolic_score?: number | null
          assessment_context?: Json | null
          assessment_id: string
          complementary_gifts?: Json | null
          completed_at?: string | null
          completion_percentage?: number | null
          completion_time?: number | null
          confidence_level?: number | null
          created_at?: string
          cultural_adjustment_applied?: boolean | null
          cultural_adjustment_factor?: number | null
          disciple_making_level?: number | null
          disciple_making_score?: number | null
          element_scores?: Json | null
          evangelistic_score?: number | null
          geometric_mean?: number | null
          id?: string
          jesus_is_lord_level?: number | null
          jesus_is_lord_score?: number | null
          liminality_communitas_level?: number | null
          liminality_communitas_score?: number | null
          limiting_factor?: string | null
          lordship_gate_applied?: boolean | null
          max_possible_score?: number | null
          missional_incarnational_level?: number | null
          missional_incarnational_score?: number | null
          normalized_scores?: Json | null
          organic_systems_level?: number | null
          organic_systems_score?: number | null
          organization_id: string
          overall_maturity_label?: string | null
          overall_maturity_level?: number | null
          personalized_recommendations?: Json | null
          primary_gift?: string | null
          prophetic_score?: number | null
          raw_scores?: Json | null
          response_consistency?: number | null
          secondary_gift?: string | null
          shepherding_score?: number | null
          sprint_pathway?: Json | null
          sprint_progress?: Json | null
          sprint_start_date?: string | null
          started_at?: string | null
          suggested_peers?: Json | null
          teaching_score?: number | null
          total_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_insights?: string | null
          apostolic_environment_level?: number | null
          apostolic_environment_score?: number | null
          apostolic_score?: number | null
          assessment_context?: Json | null
          assessment_id?: string
          complementary_gifts?: Json | null
          completed_at?: string | null
          completion_percentage?: number | null
          completion_time?: number | null
          confidence_level?: number | null
          created_at?: string
          cultural_adjustment_applied?: boolean | null
          cultural_adjustment_factor?: number | null
          disciple_making_level?: number | null
          disciple_making_score?: number | null
          element_scores?: Json | null
          evangelistic_score?: number | null
          geometric_mean?: number | null
          id?: string
          jesus_is_lord_level?: number | null
          jesus_is_lord_score?: number | null
          liminality_communitas_level?: number | null
          liminality_communitas_score?: number | null
          limiting_factor?: string | null
          lordship_gate_applied?: boolean | null
          max_possible_score?: number | null
          missional_incarnational_level?: number | null
          missional_incarnational_score?: number | null
          normalized_scores?: Json | null
          organic_systems_level?: number | null
          organic_systems_score?: number | null
          organization_id?: string
          overall_maturity_label?: string | null
          overall_maturity_level?: number | null
          personalized_recommendations?: Json | null
          primary_gift?: string | null
          prophetic_score?: number | null
          raw_scores?: Json | null
          response_consistency?: number | null
          secondary_gift?: string | null
          shepherding_score?: number | null
          sprint_pathway?: Json | null
          sprint_progress?: Json | null
          sprint_start_date?: string | null
          started_at?: string | null
          suggested_peers?: Json | null
          teaching_score?: number | null
          total_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_assessments_assessment_id_assessments_id_fk"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_assessments_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_assessments_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_calling_profiles: {
        Row: {
          ap_primary: string | null
          ap_secondary: string | null
          created_at: string
          discernment_notes: Json | null
          focus_contexts: Json | null
          focus_populations: Json | null
          id: string
          primary_vocation: string | null
          secondary_vocation: string | null
          sense_of_call_summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ap_primary?: string | null
          ap_secondary?: string | null
          created_at?: string
          discernment_notes?: Json | null
          focus_contexts?: Json | null
          focus_populations?: Json | null
          id?: string
          primary_vocation?: string | null
          secondary_vocation?: string | null
          sense_of_call_summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ap_primary?: string | null
          ap_secondary?: string | null
          created_at?: string
          discernment_notes?: Json | null
          focus_contexts?: Json | null
          focus_populations?: Json | null
          id?: string
          primary_vocation?: string | null
          secondary_vocation?: string | null
          sense_of_call_summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_calling_profiles_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_context_profiles: {
        Row: {
          context_data: Json
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          context_data: Json
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          context_data?: Json
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_identity_profiles: {
        Row: {
          big_five: Json | null
          created_at: string
          enneagram_type: string | null
          id: string
          mbti_type: string | null
          other_typologies: Json | null
          source: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          big_five?: Json | null
          created_at?: string
          enneagram_type?: string | null
          id?: string
          mbti_type?: string | null
          other_typologies?: Json | null
          source?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          big_five?: Json | null
          created_at?: string
          enneagram_type?: string | null
          id?: string
          mbti_type?: string | null
          other_typologies?: Json | null
          source?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_identity_profiles_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interests: {
        Row: {
          created_at: string
          custom_tags: Json | null
          favorite_authors: Json | null
          favorite_books: Json | null
          id: string
          theology_influences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_tags?: Json | null
          favorite_authors?: Json | null
          favorite_books?: Json | null
          id?: string
          theology_influences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_tags?: Json | null
          favorite_authors?: Json | null
          favorite_books?: Json | null
          id?: string
          theology_influences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_memory: {
        Row: {
          created_at: string
          id: string
          memory_key: string
          memory_type: string
          memory_value: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          memory_key: string
          memory_type: string
          memory_value: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          memory_key?: string
          memory_type?: string
          memory_value?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_neighborhood_context: {
        Row: {
          created_at: string
          demographic_summary: string | null
          id: string
          missional_map: Json | null
          opportunities: Json | null
          pain_points: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          demographic_summary?: string | null
          id?: string
          missional_map?: Json | null
          opportunities?: Json | null
          pain_points?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          demographic_summary?: string | null
          id?: string
          missional_map?: Json | null
          opportunities?: Json | null
          pain_points?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_neighborhood_context_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          channel: string
          created_at: string
          enabled: boolean | null
          id: string
          notification_type: string
          preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          channel: string
          created_at?: string
          enabled?: boolean | null
          id?: string
          notification_type: string
          preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          enabled?: boolean | null
          id?: string
          notification_type?: string
          preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_personality: {
        Row: {
          created_at: string
          id: string
          personality_data: Json
          personality_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          personality_data: Json
          personality_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          personality_data?: Json
          personality_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_status: string | null
          assessment_audience_engagement: number | null
          assessment_content_readiness: number | null
          assessment_movement_alignment: number | null
          assessment_network_effects: number | null
          assessment_revenue_potential: number | null
          assessment_strategic_fit: number | null
          assessment_total: number | null
          avatar_url: string | null
          bio: string | null
          brand_colors: Json | null
          country_code: string | null
          created_at: string
          cultural_context: string | null
          custom_domain: string | null
          denomination: string | null
          display_name: string | null
          email: string
          email_notifications: Json | null
          first_name: string | null
          id: string
          language_primary: string | null
          last_active_at: string | null
          last_name: string | null
          leader_tier: string | null
          ministry_role: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          organization_name: string | null
          platform_title: string | null
          privacy_settings: Json | null
          role: string | null
          subdomain: string | null
          subscription_tier: string | null
          theological_focus: Json | null
          timezone: string | null
          unified_movemental_profile: Json | null
          updated_at: string
          years_in_ministry: number | null
        }
        Insert: {
          account_status?: string | null
          assessment_audience_engagement?: number | null
          assessment_content_readiness?: number | null
          assessment_movement_alignment?: number | null
          assessment_network_effects?: number | null
          assessment_revenue_potential?: number | null
          assessment_strategic_fit?: number | null
          assessment_total?: number | null
          avatar_url?: string | null
          bio?: string | null
          brand_colors?: Json | null
          country_code?: string | null
          created_at?: string
          cultural_context?: string | null
          custom_domain?: string | null
          denomination?: string | null
          display_name?: string | null
          email: string
          email_notifications?: Json | null
          first_name?: string | null
          id?: string
          language_primary?: string | null
          last_active_at?: string | null
          last_name?: string | null
          leader_tier?: string | null
          ministry_role?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          organization_name?: string | null
          platform_title?: string | null
          privacy_settings?: Json | null
          role?: string | null
          subdomain?: string | null
          subscription_tier?: string | null
          theological_focus?: Json | null
          timezone?: string | null
          unified_movemental_profile?: Json | null
          updated_at?: string
          years_in_ministry?: number | null
        }
        Update: {
          account_status?: string | null
          assessment_audience_engagement?: number | null
          assessment_content_readiness?: number | null
          assessment_movement_alignment?: number | null
          assessment_network_effects?: number | null
          assessment_revenue_potential?: number | null
          assessment_strategic_fit?: number | null
          assessment_total?: number | null
          avatar_url?: string | null
          bio?: string | null
          brand_colors?: Json | null
          country_code?: string | null
          created_at?: string
          cultural_context?: string | null
          custom_domain?: string | null
          denomination?: string | null
          display_name?: string | null
          email?: string
          email_notifications?: Json | null
          first_name?: string | null
          id?: string
          language_primary?: string | null
          last_active_at?: string | null
          last_name?: string | null
          leader_tier?: string | null
          ministry_role?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          organization_name?: string | null
          platform_title?: string | null
          privacy_settings?: Json | null
          role?: string | null
          subdomain?: string | null
          subscription_tier?: string | null
          theological_focus?: Json | null
          timezone?: string | null
          unified_movemental_profile?: Json | null
          updated_at?: string
          years_in_ministry?: number | null
        }
        Relationships: []
      }
      user_strengths: {
        Row: {
          apest_gift: string | null
          application_context: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          related_vocation_id: string | null
          title: string
          updated_at: string
          user_id: string
          utilization_level: string | null
        }
        Insert: {
          apest_gift?: string | null
          application_context?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          related_vocation_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          utilization_level?: string | null
        }
        Update: {
          apest_gift?: string | null
          application_context?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          related_vocation_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          utilization_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_strengths_related_vocation_id_user_calling_profiles_id_fk"
            columns: ["related_vocation_id"]
            isOneToOne: false
            referencedRelation: "user_calling_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_strengths_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_struggles_challenges: {
        Row: {
          affecting_elements: Json | null
          category: string
          coping_strategies: string | null
          created_at: string
          current_status: string
          description: string | null
          id: string
          impact_level: string | null
          metadata: Json | null
          related_goal_id: string | null
          related_practice_id: string | null
          resolved_at: string | null
          started_at: string | null
          support_needed: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          affecting_elements?: Json | null
          category: string
          coping_strategies?: string | null
          created_at?: string
          current_status?: string
          description?: string | null
          id?: string
          impact_level?: string | null
          metadata?: Json | null
          related_goal_id?: string | null
          related_practice_id?: string | null
          resolved_at?: string | null
          started_at?: string | null
          support_needed?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          affecting_elements?: Json | null
          category?: string
          coping_strategies?: string | null
          created_at?: string
          current_status?: string
          description?: string | null
          id?: string
          impact_level?: string | null
          metadata?: Json | null
          related_goal_id?: string | null
          related_practice_id?: string | null
          resolved_at?: string | null
          started_at?: string | null
          support_needed?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_struggles_challenges_related_practice_id_formation_practic"
            columns: ["related_practice_id"]
            isOneToOne: false
            referencedRelation: "formation_practice_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_struggles_challenges_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          ai_interactions_limit: number | null
          ai_interactions_used: number | null
          amount: number
          billing_cycle: string
          cancel_at_period_end: boolean | null
          cancelled_at: string | null
          created_at: string
          currency: string | null
          current_period_end: string
          current_period_start: string
          id: string
          leader_profile_id: string | null
          months_subscribed: number | null
          organization_id: string | null
          plan_id: string
          status: string
          storage_used: number | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          total_revenue: number | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_interactions_limit?: number | null
          ai_interactions_used?: number | null
          amount: number
          billing_cycle: string
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end: string
          current_period_start: string
          id?: string
          leader_profile_id?: string | null
          months_subscribed?: number | null
          organization_id?: string | null
          plan_id: string
          status: string
          storage_used?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          total_revenue?: number | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_interactions_limit?: number | null
          ai_interactions_used?: number | null
          amount?: number
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string
          current_period_start?: string
          id?: string
          leader_profile_id?: string | null
          months_subscribed?: number | null
          organization_id?: string | null
          plan_id?: string
          status?: string
          storage_used?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          total_revenue?: number | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_leader_profile_id_user_profiles_id_fk"
            columns: ["leader_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_plan_id_subscription_plans_id_fk"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_vocation: {
        Row: {
          calling_summary: string | null
          created_at: string
          id: string
          ministry_context: string | null
          preferred_leadership_style: string | null
          roles: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calling_summary?: string | null
          created_at?: string
          id?: string
          ministry_context?: string | null
          preferred_leadership_style?: string | null
          roles?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calling_summary?: string | null
          created_at?: string
          id?: string
          ministry_context?: string | null
          preferred_leadership_style?: string | null
          roles?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_vocation_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      video_annotations: {
        Row: {
          annotation_type: string
          created_at: string
          data: Json | null
          end_time_seconds: number | null
          id: string
          layer: number | null
          position: Json | null
          recording_id: string
          start_time_seconds: number
          style: Json | null
          updated_at: string
          visible: boolean | null
        }
        Insert: {
          annotation_type: string
          created_at?: string
          data?: Json | null
          end_time_seconds?: number | null
          id?: string
          layer?: number | null
          position?: Json | null
          recording_id: string
          start_time_seconds: number
          style?: Json | null
          updated_at?: string
          visible?: boolean | null
        }
        Update: {
          annotation_type?: string
          created_at?: string
          data?: Json | null
          end_time_seconds?: number | null
          id?: string
          layer?: number | null
          position?: Json | null
          recording_id?: string
          start_time_seconds?: number
          style?: Json | null
          updated_at?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "video_annotations_recording_id_video_recordings_id_fk"
            columns: ["recording_id"]
            isOneToOne: false
            referencedRelation: "video_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      video_recording_segments: {
        Row: {
          created_at: string
          duration_seconds: number
          file_size_bytes: number | null
          file_url: string
          id: string
          recording_id: string
          segment_index: number
          start_time_seconds: number
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_seconds: number
          file_size_bytes?: number | null
          file_url: string
          id?: string
          recording_id: string
          segment_index: number
          start_time_seconds: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          file_size_bytes?: number | null
          file_url?: string
          id?: string
          recording_id?: string
          segment_index?: number
          start_time_seconds?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_recording_segments_recording_id_video_recordings_id_fk"
            columns: ["recording_id"]
            isOneToOne: false
            referencedRelation: "video_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      video_recording_slides: {
        Row: {
          annotations: Json | null
          created_at: string
          duration_seconds: number | null
          end_time_seconds: number | null
          id: string
          notes: string | null
          recording_id: string
          slide_index: number
          slide_url: string
          start_time_seconds: number | null
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          annotations?: Json | null
          created_at?: string
          duration_seconds?: number | null
          end_time_seconds?: number | null
          id?: string
          notes?: string | null
          recording_id: string
          slide_index: number
          slide_url: string
          start_time_seconds?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          annotations?: Json | null
          created_at?: string
          duration_seconds?: number | null
          end_time_seconds?: number | null
          id?: string
          notes?: string | null
          recording_id?: string
          slide_index?: number
          slide_url?: string
          start_time_seconds?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_recording_slides_recording_id_video_recordings_id_fk"
            columns: ["recording_id"]
            isOneToOne: false
            referencedRelation: "video_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      video_recording_whiteboard: {
        Row: {
          canvas_data: string
          created_at: string
          frame_time_seconds: number
          id: string
          layer: number | null
          recording_id: string
          thumbnail_url: string | null
        }
        Insert: {
          canvas_data: string
          created_at?: string
          frame_time_seconds: number
          id?: string
          layer?: number | null
          recording_id: string
          thumbnail_url?: string | null
        }
        Update: {
          canvas_data?: string
          created_at?: string
          frame_time_seconds?: number
          id?: string
          layer?: number | null
          recording_id?: string
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_recording_whiteboard_recording_id_video_recordings_id_fk"
            columns: ["recording_id"]
            isOneToOne: false
            referencedRelation: "video_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      video_recordings: {
        Row: {
          created_at: string
          duration_seconds: number | null
          id: string
          metadata: Json | null
          organization_id: string
          recording_url: string | null
          status: string | null
          thumbnail_url: string | null
          title: string | null
          transcription: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number | null
          id?: string
          metadata?: Json | null
          organization_id: string
          recording_url?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string | null
          transcription?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number | null
          id?: string
          metadata?: Json | null
          organization_id?: string
          recording_url?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string | null
          transcription?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_recordings_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      video_series: {
        Row: {
          author_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          slug: string
          status: string | null
          thumbnail_url: string | null
          total_duration_seconds: number | null
          updated_at: string
          video_count: number | null
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          slug: string
          status?: string | null
          thumbnail_url?: string | null
          total_duration_seconds?: number | null
          updated_at?: string
          video_count?: number | null
        }
        Update: {
          author_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          slug?: string
          status?: string | null
          thumbnail_url?: string | null
          total_duration_seconds?: number | null
          updated_at?: string
          video_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_series_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_series_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      video_watch_history: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          last_watched_at: string | null
          progress_seconds: number | null
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          last_watched_at?: string | null
          progress_seconds?: number | null
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          last_watched_at?: string | null
          progress_seconds?: number | null
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_watch_history_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_watch_history_video_id_videos_id_fk"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          access_type: string | null
          author_id: string
          average_watch_time_seconds: number | null
          captions_url: string | null
          codec: string | null
          comment_count: number | null
          completion_rate: number | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          embed_code: string | null
          external_id: string | null
          file_size_mb: number | null
          hosting_provider: string | null
          id: string
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          organization_id: string
          poster_image_url: string | null
          price_usd: number | null
          primary_category_id: string | null
          published_at: string | null
          required_plan_tier: string | null
          resolutions: Json | null
          search_vector: string | null
          secondary_categories: Json | null
          series_id: string | null
          series_order: number | null
          slug: string
          source_recording_id: string | null
          status: string | null
          tags: Json | null
          thumbnail_url: string | null
          title: string
          transcript: string | null
          updated_at: string
          video_url: string
          view_count: number | null
        }
        Insert: {
          access_type?: string | null
          author_id: string
          average_watch_time_seconds?: number | null
          captions_url?: string | null
          codec?: string | null
          comment_count?: number | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          embed_code?: string | null
          external_id?: string | null
          file_size_mb?: number | null
          hosting_provider?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id: string
          poster_image_url?: string | null
          price_usd?: number | null
          primary_category_id?: string | null
          published_at?: string | null
          required_plan_tier?: string | null
          resolutions?: Json | null
          search_vector?: string | null
          secondary_categories?: Json | null
          series_id?: string | null
          series_order?: number | null
          slug: string
          source_recording_id?: string | null
          status?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          title: string
          transcript?: string | null
          updated_at?: string
          video_url: string
          view_count?: number | null
        }
        Update: {
          access_type?: string | null
          author_id?: string
          average_watch_time_seconds?: number | null
          captions_url?: string | null
          codec?: string | null
          comment_count?: number | null
          completion_rate?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          embed_code?: string | null
          external_id?: string | null
          file_size_mb?: number | null
          hosting_provider?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          organization_id?: string
          poster_image_url?: string | null
          price_usd?: number | null
          primary_category_id?: string | null
          published_at?: string | null
          required_plan_tier?: string | null
          resolutions?: Json | null
          search_vector?: string | null
          secondary_categories?: Json | null
          series_id?: string | null
          series_order?: number | null
          slug?: string
          source_recording_id?: string | null
          status?: string | null
          tags?: Json | null
          thumbnail_url?: string | null
          title?: string
          transcript?: string | null
          updated_at?: string
          video_url?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_author_id_user_profiles_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_primary_category_id_content_categories_id_fk"
            columns: ["primary_category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_series_id_video_series_id_fk"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "video_series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_source_recording_id_video_recordings_id_fk"
            columns: ["source_recording_id"]
            isOneToOne: false
            referencedRelation: "video_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_baselines: {
        Row: {
          content_samples: Json
          created_at: string
          id: string
          sample_count: number | null
          updated_at: string
          user_id: string
          voice_fingerprint: Json
        }
        Insert: {
          content_samples?: Json
          created_at?: string
          id?: string
          sample_count?: number | null
          updated_at?: string
          user_id: string
          voice_fingerprint?: Json
        }
        Update: {
          content_samples?: Json
          created_at?: string
          id?: string
          sample_count?: number | null
          updated_at?: string
          user_id?: string
          voice_fingerprint?: Json
        }
        Relationships: [
          {
            foreignKeyName: "voice_baselines_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_fidelity_eval_samples: {
        Row: {
          agent_dimension_scores: Json | null
          agent_overall_score: number | null
          article_text_slice: string | null
          article_title: string | null
          content_hash: string
          created_at: string
          human_dimension_scores: Json | null
          human_overall_score: number | null
          human_ratings_by_user: Json | null
          id: string
          organization_id: string
        }
        Insert: {
          agent_dimension_scores?: Json | null
          agent_overall_score?: number | null
          article_text_slice?: string | null
          article_title?: string | null
          content_hash: string
          created_at?: string
          human_dimension_scores?: Json | null
          human_overall_score?: number | null
          human_ratings_by_user?: Json | null
          id?: string
          organization_id: string
        }
        Update: {
          agent_dimension_scores?: Json | null
          agent_overall_score?: number | null
          article_text_slice?: string | null
          article_title?: string | null
          content_hash?: string
          created_at?: string
          human_dimension_scores?: Json | null
          human_overall_score?: number | null
          human_ratings_by_user?: Json | null
          id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_fidelity_eval_samples_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_fidelity_feedback: {
        Row: {
          content_hash: string | null
          created_at: string
          dimension_key: string | null
          evaluation_id: string | null
          feedback_type: string
          id: string
          organization_id: string
          user_comment: string | null
          user_id: string
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          dimension_key?: string | null
          evaluation_id?: string | null
          feedback_type: string
          id?: string
          organization_id: string
          user_comment?: string | null
          user_id: string
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          dimension_key?: string | null
          evaluation_id?: string | null
          feedback_type?: string
          id?: string
          organization_id?: string
          user_comment?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_fidelity_feedback_organization_id_organizations_id_fk"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_fidelity_feedback_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_identities: {
        Row: {
          core_identity: string
          created_at: string
          header_template: string
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          platform_context: string | null
          updated_at: string
        }
        Insert: {
          core_identity: string
          created_at?: string
          header_template: string
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          platform_context?: string | null
          updated_at?: string
        }
        Update: {
          core_identity?: string
          created_at?: string
          header_template?: string
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          platform_context?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string
          current_step: number | null
          id: string
          name: string
          results: Json | null
          sermon_preparation_id: string | null
          status: string
          updated_at: string
          workflow_definition: Json
        }
        Insert: {
          created_at?: string
          current_step?: number | null
          id?: string
          name: string
          results?: Json | null
          sermon_preparation_id?: string | null
          status?: string
          updated_at?: string
          workflow_definition: Json
        }
        Update: {
          created_at?: string
          current_step?: number | null
          id?: string
          name?: string
          results?: Json | null
          sermon_preparation_id?: string | null
          status?: string
          updated_at?: string
          workflow_definition?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workflows_sermon_preparation_id_sermon_preparations_id_fk"
            columns: ["sermon_preparation_id"]
            isOneToOne: false
            referencedRelation: "sermon_preparations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_documents: {
        Row: {
          archived_at: string | null
          created_at: string
          created_by: string | null
          description: string
          id: string
          organization_id: string
          section: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          organization_id: string
          section: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          organization_id?: string
          section?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_liveblocks_snapshots: {
        Row: {
          id: string
          organization_id: string
          room_id: string
          slug: string
          updated_at: string
          ydoc: Json
        }
        Insert: {
          id?: string
          organization_id: string
          room_id: string
          slug: string
          updated_at?: string
          ydoc: Json
        }
        Update: {
          id?: string
          organization_id?: string
          room_id?: string
          slug?: string
          updated_at?: string
          ydoc?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workspace_liveblocks_snapshots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      write: {
        Row: {
          avatar_url: string | null
          bio: string | null
          committed: boolean | null
          created_at: string
          digital_presence: Json | null
          email: string | null
          full_name: string
          id: string
          linked_at: string | null
          linked_user_id: string | null
          organization: string | null
          profile_data: Json | null
          role: string | null
          slug: string | null
          tags: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          committed?: boolean | null
          created_at?: string
          digital_presence?: Json | null
          email?: string | null
          full_name: string
          id?: string
          linked_at?: string | null
          linked_user_id?: string | null
          organization?: string | null
          profile_data?: Json | null
          role?: string | null
          slug?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          committed?: boolean | null
          created_at?: string
          digital_presence?: Json | null
          email?: string | null
          full_name?: string
          id?: string
          linked_at?: string | null
          linked_user_id?: string | null
          organization?: string | null
          profile_data?: Json | null
          role?: string | null
          slug?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      write_content: {
        Row: {
          body_excerpt: string | null
          body_full: string | null
          content_type: string
          created_at: string
          id: string
          metadata: Json | null
          title: string
          updated_at: string
          url: string | null
          write_id: string
        }
        Insert: {
          body_excerpt?: string | null
          body_full?: string | null
          content_type: string
          created_at?: string
          id?: string
          metadata?: Json | null
          title: string
          updated_at?: string
          url?: string | null
          write_id: string
        }
        Update: {
          body_excerpt?: string | null
          body_full?: string | null
          content_type?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          title?: string
          updated_at?: string
          url?: string | null
          write_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "write_content_write_id_fkey"
            columns: ["write_id"]
            isOneToOne: false
            referencedRelation: "write"
            referencedColumns: ["id"]
          },
        ]
      }
      writing_examples: {
        Row: {
          content: string
          example_number: number
          form_keys: string[] | null
          form_technique: string | null
          id: string
          organization_id: string
          source: string | null
          title: string
          voice_markers: string | null
        }
        Insert: {
          content: string
          example_number: number
          form_keys?: string[] | null
          form_technique?: string | null
          id?: string
          organization_id: string
          source?: string | null
          title: string
          voice_markers?: string | null
        }
        Update: {
          content?: string
          example_number?: number
          form_keys?: string[] | null
          form_technique?: string | null
          id?: string
          organization_id?: string
          source?: string | null
          title?: string
          voice_markers?: string | null
        }
        Relationships: []
      }
      writing_interactions: {
        Row: {
          accepted: boolean | null
          created_at: string
          guidance: string | null
          id: string
          input_text: string | null
          latency_ms: number | null
          model_id: string | null
          output_text: string | null
          prompt_metadata: Json | null
          selection_scope: string | null
          session_id: string
          token_count_input: number | null
          token_count_output: number | null
          trace_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          accepted?: boolean | null
          created_at?: string
          guidance?: string | null
          id?: string
          input_text?: string | null
          latency_ms?: number | null
          model_id?: string | null
          output_text?: string | null
          prompt_metadata?: Json | null
          selection_scope?: string | null
          session_id: string
          token_count_input?: number | null
          token_count_output?: number | null
          trace_id?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          accepted?: boolean | null
          created_at?: string
          guidance?: string | null
          id?: string
          input_text?: string | null
          latency_ms?: number | null
          model_id?: string | null
          output_text?: string | null
          prompt_metadata?: Json | null
          selection_scope?: string | null
          session_id?: string
          token_count_input?: number | null
          token_count_output?: number | null
          trace_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      writing_session_feedback: {
        Row: {
          content_depth_rating: number | null
          created_at: string
          free_text: string | null
          id: string
          improvement_signals: Json | null
          marker_ratings: Json | null
          quality_rating: number | null
          session_id: string
          updated_at: string
          usefulness_rating: number | null
          user_id: string
          voice_fidelity_rating: number | null
        }
        Insert: {
          content_depth_rating?: number | null
          created_at?: string
          free_text?: string | null
          id?: string
          improvement_signals?: Json | null
          marker_ratings?: Json | null
          quality_rating?: number | null
          session_id: string
          updated_at?: string
          usefulness_rating?: number | null
          user_id: string
          voice_fidelity_rating?: number | null
        }
        Update: {
          content_depth_rating?: number | null
          created_at?: string
          free_text?: string | null
          id?: string
          improvement_signals?: Json | null
          marker_ratings?: Json | null
          quality_rating?: number | null
          session_id?: string
          updated_at?: string
          usefulness_rating?: number | null
          user_id?: string
          voice_fidelity_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "writing_session_feedback_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      writing_sessions: {
        Row: {
          accepted_count: number | null
          brief: string | null
          completed_at: string | null
          content_form: string
          created_at: string
          final_content: string | null
          id: string
          initial_content: string | null
          interaction_count: number | null
          rejected_count: number | null
          status: string | null
          title: string | null
          updated_at: string
          user_id: string
          word_count_final: number | null
          word_count_initial: number | null
        }
        Insert: {
          accepted_count?: number | null
          brief?: string | null
          completed_at?: string | null
          content_form: string
          created_at?: string
          final_content?: string | null
          id?: string
          initial_content?: string | null
          interaction_count?: number | null
          rejected_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          word_count_final?: number | null
          word_count_initial?: number | null
        }
        Update: {
          accepted_count?: number | null
          brief?: string | null
          completed_at?: string | null
          content_form?: string
          created_at?: string
          final_content?: string | null
          id?: string
          initial_content?: string | null
          interaction_count?: number | null
          rejected_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          word_count_final?: number | null
          word_count_initial?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "writing_sessions_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      writing_style_preferences: {
        Row: {
          content_form: string | null
          corrections: Json | null
          created_at: string
          custom_instructions: string | null
          id: string
          is_active: boolean | null
          last_aggregated_at: string | null
          session_count: number | null
          tone_notes: string | null
          updated_at: string
          user_id: string
          voice_adjustments: Json | null
        }
        Insert: {
          content_form?: string | null
          corrections?: Json | null
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_active?: boolean | null
          last_aggregated_at?: string | null
          session_count?: number | null
          tone_notes?: string | null
          updated_at?: string
          user_id: string
          voice_adjustments?: Json | null
        }
        Update: {
          content_form?: string | null
          corrections?: Json | null
          created_at?: string
          custom_instructions?: string | null
          id?: string
          is_active?: boolean | null
          last_aggregated_at?: string | null
          session_count?: number | null
          tone_notes?: string | null
          updated_at?: string
          user_id?: string
          voice_adjustments?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "writing_style_preferences_user_id_user_profiles_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      onbuilding_profile_sections_with_leader: {
        Row: {
          body_md: string | null
          created_at: string | null
          id: string | null
          last_edited_at: string | null
          last_edited_by: string | null
          movement_leader_id: string | null
          movement_leader_name: string | null
          movement_leader_slug: string | null
          ordinal: number | null
          ratified_at: string | null
          ratified_by: string | null
          section_key: string | null
          source_section_key: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onbuilding_profile_sections_last_edited_by_fkey"
            columns: ["last_edited_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_profile_sections_movement_leader_id_fkey"
            columns: ["movement_leader_id"]
            isOneToOne: false
            referencedRelation: "movement_leaders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onbuilding_profile_sections_ratified_by_fkey"
            columns: ["ratified_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      can_edit_onboarding_content: { Args: { uid: string }; Returns: boolean }
      is_invitation_cohort_admin: { Args: { uid: string }; Returns: boolean }
      is_member_of_org: { Args: { org: string; uid: string }; Returns: boolean }
      is_movement_leader_owner: {
        Args: { leader_id: string }
        Returns: boolean
      }
      is_movemental_staff: { Args: { uid: string }; Returns: boolean }
      js_imul: { Args: { a: number; b: number }; Returns: number }
      onbuilding_storage_leader_id: {
        Args: { object_name: string }
        Returns: string
      }
      or32_js: { Args: { x: number }; Returns: number }
      org_membership_can_mutate_customer_content: {
        Args: { org_id: string }
        Returns: boolean
      }
      podcast_editorial_square_path: { Args: { slug: string }; Returns: string }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      slugify: { Args: { input: string }; Returns: string }
      user_has_org_access: { Args: { org_id: string }; Returns: boolean }
    }
    Enums: {
      cohort_slot_day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
      guided_item_state: "locked" | "ready" | "in_progress" | "blocked" | "done"
      guided_item_type: "course_segment" | "pathway_step" | "article"
      movement_leader_application_status:
        | "submitted"
        | "under_review"
        | "approved"
        | "declined"
        | "on_hold"
      movement_leader_revision_request_status: "open" | "addressed" | "closed"
      movement_leader_signature_method: "click_through" | "docusign" | "offline"
      movement_leader_status: "pending" | "active" | "archived"
      movement_leader_welcome_letter_status: "published" | "archived"
      movemental_staff_role: "founder" | "facilitator" | "support" | "engineer"
      onboarding_cohort_status:
        | "forming"
        | "confirmed"
        | "in_progress"
        | "completed"
      org_current_stage: "safety" | "sandbox" | "skills" | "solutions"
      safety_artifact_status: "draft" | "published" | "archived"
      safety_comment_status: "open" | "resolved"
      safety_engagement_status:
        | "provisioning"
        | "kickoff_scheduled"
        | "drafting"
        | "in_review"
        | "revision"
        | "ratification"
        | "rollout"
        | "complete"
      safety_enrollment_status:
        | "pending_payment"
        | "paid"
        | "provisioned"
        | "cancelled"
      safety_review_status: "drafting" | "in_review" | "revised" | "ratified"
      safety_rollout_kind:
        | "board_packet"
        | "staff_announcement"
        | "constituent_message"
        | "faq"
        | "incident_briefing"
        | "pre_engagement_framework"
      safety_signature_status: "awaiting" | "signed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cohort_slot_day: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      guided_item_state: ["locked", "ready", "in_progress", "blocked", "done"],
      guided_item_type: ["course_segment", "pathway_step", "article"],
      movement_leader_application_status: [
        "submitted",
        "under_review",
        "approved",
        "declined",
        "on_hold",
      ],
      movement_leader_revision_request_status: ["open", "addressed", "closed"],
      movement_leader_signature_method: [
        "click_through",
        "docusign",
        "offline",
      ],
      movement_leader_status: ["pending", "active", "archived"],
      movement_leader_welcome_letter_status: ["published", "archived"],
      movemental_staff_role: ["founder", "facilitator", "support", "engineer"],
      onboarding_cohort_status: [
        "forming",
        "confirmed",
        "in_progress",
        "completed",
      ],
      org_current_stage: ["safety", "sandbox", "skills", "solutions"],
      safety_artifact_status: ["draft", "published", "archived"],
      safety_comment_status: ["open", "resolved"],
      safety_engagement_status: [
        "provisioning",
        "kickoff_scheduled",
        "drafting",
        "in_review",
        "revision",
        "ratification",
        "rollout",
        "complete",
      ],
      safety_enrollment_status: [
        "pending_payment",
        "paid",
        "provisioned",
        "cancelled",
      ],
      safety_review_status: ["drafting", "in_review", "revised", "ratified"],
      safety_rollout_kind: [
        "board_packet",
        "staff_announcement",
        "constituent_message",
        "faq",
        "incident_briefing",
        "pre_engagement_framework",
      ],
      safety_signature_status: ["awaiting", "signed"],
    },
  },
} as const
