export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          type: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          type: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          type?: string
          created_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          id: number
          amount: number
          description: string
          date: string
          type: string
          category_id: number
          user_id: number
          created_at: string
        }
        Insert: {
          id?: number
          amount: number
          description: string
          date?: string
          type: string
          category_id: number
          user_id: number
          created_at?: string
        }
        Update: {
          id?: number
          amount?: number
          description?: string
          date?: string
          type?: string
          category_id?: number
          user_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      budgets: {
        Row: {
          id: number
          month: number
          year: number
          user_id: number
          created_at: string
        }
        Insert: {
          id?: number
          month: number
          year: number
          user_id: number
          created_at?: string
        }
        Update: {
          id?: number
          month?: number
          year?: number
          user_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      budget_categories: {
        Row: {
          id: number
          amount: number
          budget_id: number
          category_id: number
          created_at: string
        }
        Insert: {
          id?: number
          amount: number
          budget_id: number
          category_id: number
          created_at?: string
        }
        Update: {
          id?: number
          amount?: number
          budget_id?: number
          category_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_categories_budget_id_fkey"
            columns: ["budget_id"]
            referencedRelation: "budgets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budget_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: number
          username: string
          password: string
          created_at: string
        }
        Insert: {
          id?: number
          username: string
          password: string
          created_at?: string
        }
        Update: {
          id?: number
          username?: string
          password?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_categories_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_transactions_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_budgets_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_budget_categories_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
