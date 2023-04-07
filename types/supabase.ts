export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string
          discord_user_id: string
          igdb_game_id: number
          name: string
        }
        Insert: {
          created_at?: string
          discord_user_id: string
          igdb_game_id?: number
          name: string
        }
        Update: {
          created_at?: string
          discord_user_id?: string
          igdb_game_id?: number
          name?: string
        }
      }
      gaming_platforms: {
        Row: {
          created_at: string
          discord_user_id: string
          pc: boolean | null
          playstation: boolean | null
          switch: boolean | null
          updated_at: string
          xbox: boolean | null
        }
        Insert: {
          created_at?: string
          discord_user_id: string
          pc?: boolean | null
          playstation?: boolean | null
          switch?: boolean | null
          updated_at?: string
          xbox?: boolean | null
        }
        Update: {
          created_at?: string
          discord_user_id?: string
          pc?: boolean | null
          playstation?: boolean | null
          switch?: boolean | null
          updated_at?: string
          xbox?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
