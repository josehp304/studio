"use client";

import { deleteEntity, saveEntity } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

interface Field {
    name: string;
    label: string;
    type: "text" | "number" | "select" | "boolean";
    options?: { label: string; value: string }[];
}

interface AdminFormProps {
    table: string;
    id: string;
    initialData?: any;
    fields: Field[];
}

export function AdminForm({ table, id, initialData, fields }: AdminFormProps) {
    const router = useRouter();
    const [data, setData] = useState<any>(initialData || {});
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        setSaving(true);
        await saveEntity(table, id === 'new' ? null : id, data);
        setSaving(false);
        router.push(`/admin/${table}`);
    }

    return (
        <Card className="max-w-xl shadow-sm border-border">
            <CardHeader>
                <CardTitle className="text-xl">{id === 'new' ? 'Create' : 'Edit'} Record</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map(field => (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-muted-foreground">{field.label}</Label>

                        {field.type === "text" && (
                            <Input
                                id={field.name}
                                value={data[field.name] || ""}
                                onChange={e => setData({ ...data, [field.name]: e.target.value })}
                            />
                        )}

                        {field.type === "number" && (
                            <Input
                                id={field.name}
                                type="number"
                                value={data[field.name] || ""}
                                onChange={e => setData({ ...data, [field.name]: e.target.value })}
                            />
                        )}

                        {field.type === "boolean" && (
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox
                                    id={field.name}
                                    checked={!!data[field.name]}
                                    onCheckedChange={(checked) => setData({ ...data, [field.name]: checked })}
                                />
                                <span className="text-sm">Enabled</span>
                            </div>
                        )}

                        {field.type === "select" && (
                            <Select value={data[field.name]} onValueChange={val => setData({ ...data, [field.name]: val })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options?.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                ))}

                <div className="pt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => router.push(`/admin/${table}`)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>
            </CardContent>
        </Card>
    );
}
