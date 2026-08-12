"use client";

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    
    return (
        <div className="flex items-center gap-2">
            <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Label htmlFor="dark-mode" className="text-md">
                {isDark ? "Light Mode" : "Dark Mode"}
            </Label>
        </div>
    );
}