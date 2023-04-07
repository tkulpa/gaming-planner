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
          id: number
          igdb_game_id: number
        }
        Insert: {
          created_at?: string
          discord_user_id: string
          id?: number
          igdb_game_id: number
        }
        Update: {
          created_at?: string
          discord_user_id?: string
          id?: number
          igdb_game_id?: number
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
