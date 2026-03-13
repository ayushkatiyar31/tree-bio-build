"use client"

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ClaimLinkForm = () => {
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!linkValue.trim()) return;

    try {
      setIsClaiming(true);

      toast.success("Link created successfully");

      router.push("/admin/my-tree");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsClaiming(false);
    }
  };

  const displayOrigin = origin
    ? origin.replace("https://", "").replace("http://", "")
    : "treebio.com";

  return (
    <div className="space-y-8 max-w-md mx-auto w-full">
      <form
        className="space-y-6 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-r">
              <span className="text-sm font-medium">
                {displayOrigin}/
              </span>
            </div>

            <Input
              type="text"
              placeholder="yourname"
              value={linkValue}
              onChange={(e) =>
                setLinkValue(
                  e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "")
                )
              }
              maxLength={30}
              className="border-0 h-12 shadow-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!linkValue.trim()}
          className="w-full h-12"
          size="lg"
        >
          {isClaiming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Create Your TreeBio Link"
          )}
        </Button>

        <p className="text-xs text-neutral-500 text-center">
          By continuing, you agree to TreeBio's Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </div>
  );
};

export default ClaimLinkForm;