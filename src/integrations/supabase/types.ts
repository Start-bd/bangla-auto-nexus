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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      car_listings: {
        Row: {
          auction_sheet_url: string | null
          brand: string
          color: string | null
          color_bn: string | null
          condition: Database["public"]["Enums"]["listing_condition"]
          created_at: string
          dealer_id: string | null
          description: string | null
          description_bn: string | null
          district: string
          engine_cc: number | null
          expires_at: string | null
          features: string[] | null
          fuel_type: string | null
          grade: string | null
          id: string
          is_sold: boolean
          is_verified: boolean
          listing_tier: Database["public"]["Enums"]["listing_tier"]
          model: string
          odometer_km: number | null
          origin_country: string | null
          photos: string[] | null
          price_bdt: number
          price_negotiable: boolean
          seller_phone: string | null
          seller_type: string
          seller_user_id: string
          slug: string
          transmission: string | null
          updated_at: string
          views_count: number
          year: number
        }
        Insert: {
          auction_sheet_url?: string | null
          brand: string
          color?: string | null
          color_bn?: string | null
          condition?: Database["public"]["Enums"]["listing_condition"]
          created_at?: string
          dealer_id?: string | null
          description?: string | null
          description_bn?: string | null
          district: string
          engine_cc?: number | null
          expires_at?: string | null
          features?: string[] | null
          fuel_type?: string | null
          grade?: string | null
          id?: string
          is_sold?: boolean
          is_verified?: boolean
          listing_tier?: Database["public"]["Enums"]["listing_tier"]
          model: string
          odometer_km?: number | null
          origin_country?: string | null
          photos?: string[] | null
          price_bdt: number
          price_negotiable?: boolean
          seller_phone?: string | null
          seller_type?: string
          seller_user_id: string
          slug: string
          transmission?: string | null
          updated_at?: string
          views_count?: number
          year: number
        }
        Update: {
          auction_sheet_url?: string | null
          brand?: string
          color?: string | null
          color_bn?: string | null
          condition?: Database["public"]["Enums"]["listing_condition"]
          created_at?: string
          dealer_id?: string | null
          description?: string | null
          description_bn?: string | null
          district?: string
          engine_cc?: number | null
          expires_at?: string | null
          features?: string[] | null
          fuel_type?: string | null
          grade?: string | null
          id?: string
          is_sold?: boolean
          is_verified?: boolean
          listing_tier?: Database["public"]["Enums"]["listing_tier"]
          model?: string
          odometer_km?: number | null
          origin_country?: string | null
          photos?: string[] | null
          price_bdt?: number
          price_negotiable?: boolean
          seller_phone?: string | null
          seller_type?: string
          seller_user_id?: string
          slug?: string
          transmission?: string | null
          updated_at?: string
          views_count?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "car_listings_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          description_bn: string | null
          district: string
          email: string | null
          id: string
          is_verified: boolean
          listing_limit: number
          logo_url: string | null
          name: string
          name_bn: string | null
          owner_user_id: string | null
          phone: string | null
          slug: string
          subscription_tier: Database["public"]["Enums"]["dealer_subscription"]
          updated_at: string
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          description_bn?: string | null
          district: string
          email?: string | null
          id?: string
          is_verified?: boolean
          listing_limit?: number
          logo_url?: string | null
          name: string
          name_bn?: string | null
          owner_user_id?: string | null
          phone?: string | null
          slug: string
          subscription_tier?: Database["public"]["Enums"]["dealer_subscription"]
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          description_bn?: string | null
          district?: string
          email?: string | null
          id?: string
          is_verified?: boolean
          listing_limit?: number
          logo_url?: string | null
          name?: string
          name_bn?: string | null
          owner_user_id?: string | null
          phone?: string | null
          slug?: string
          subscription_tier?: Database["public"]["Enums"]["dealer_subscription"]
          updated_at?: string
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "car_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          district: string | null
          id: string
          phone: string | null
          preferred_language: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      dealer_subscription: "free" | "basic" | "premium" | "enterprise"
      listing_condition: "new" | "used" | "reconditioned"
      listing_tier: "free" | "premium" | "featured"
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
      app_role: ["admin", "moderator", "user"],
      dealer_subscription: ["free", "basic", "premium", "enterprise"],
      listing_condition: ["new", "used", "reconditioned"],
      listing_tier: ["free", "premium", "featured"],
    },
  },
} as const
