import { Suspense } from "react";
import { redirect } from "next/navigation";
import { History } from "@/app/(app)/automation/History";
import { Pending } from "@/app/(app)/automation/Pending";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { Rules } from "@/app/(app)/automation/Rules";
import { TestRulesContent } from "@/app/(app)/automation/TestRules";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BulkRunRules } from "@/app/(app)/automation/BulkRunRules";
import { Groups } from "@/app/(app)/automation/group/Groups";
import { RulesPrompt } from "@/app/(app)/automation/RulesPrompt";
import { OnboardingModal } from "@/components/OnboardingModal";
import { PermissionsCheck } from "@/app/(app)/PermissionsCheck";

export const maxDuration = 300; // Applies to the actions

export default async function AutomationPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <Suspense>
      <PermissionsCheck />

      <Tabs defaultValue="prompt">
        <div className="content-container flex shrink-0 flex-col justify-between gap-x-4 space-y-2 border-b border-gray-200 bg-white py-2 shadow-sm md:flex-row md:gap-x-6 md:space-y-0">
          <div className="w-full overflow-x-auto">
            <TabsList>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex gap-2">
            <BulkRunRules />
            <OnboardingModal
              title="Getting started with AI Personal Assistant"
              description={
                <>
                  Learn how to use the AI Personal Assistant to automatically
                  label, archive, and more.
                </>
              }
              videoId="1LSt3dyyZtQ"
            />
          </div>
        </div>

        <TabsContent value="prompt" className="content-container mb-10">
          <RulesPrompt />
        </TabsContent>
        <TabsContent value="rules" className="content-container mb-10">
          <Rules />
        </TabsContent>
        <TabsContent value="pending" className="content-container mb-10">
          <Pending />
        </TabsContent>
        <TabsContent value="history" className="content-container mb-10">
          <History />
        </TabsContent>
        <TabsContent value="test" className="content-container mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Test your rules</CardTitle>
              <CardDescription>
                Check how your rules perform against previous emails or custom
                content.
              </CardDescription>
            </CardHeader>
            <TestRulesContent />
          </Card>
        </TabsContent>
        <TabsContent value="groups" className="content-container mb-10">
          <Groups />
        </TabsContent>
      </Tabs>
    </Suspense>
  );
}