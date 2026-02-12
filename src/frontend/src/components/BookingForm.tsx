import { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BookingFormProps {
  restaurantId: bigint;
  restaurantName: string;
  onSubmit: (data: BookingData) => Promise<void>;
  onCancel: () => void;
}

export interface BookingData {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes: string;
}

export default function BookingForm({ restaurantId, restaurantName, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    customerName: '',
    phone: '',
    date: '',
    time: '',
    partySize: 2,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (formData.partySize < 1) {
      newErrors.partySize = 'Party size must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Book a Table</h3>
        <p className="text-sm text-muted-foreground">at {restaurantName}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="customerName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name *
          </Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="Your full name"
            className={errors.customerName ? 'border-destructive' : ''}
          />
          {errors.customerName && (
            <p className="text-xs text-destructive mt-1">{errors.customerName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Your phone number"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date *
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && (
              <p className="text-xs text-destructive mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time *
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className={errors.time ? 'border-destructive' : ''}
            />
            {errors.time && (
              <p className="text-xs text-destructive mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="partySize" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Party Size *
          </Label>
          <Input
            id="partySize"
            type="number"
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: parseInt(e.target.value) || 1 })}
            className={errors.partySize ? 'border-destructive' : ''}
          />
          {errors.partySize && (
            <p className="text-xs text-destructive mt-1">{errors.partySize}</p>
          )}
        </div>

        <div>
          <Label htmlFor="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any special requests or dietary requirements..."
            rows={3}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
}
