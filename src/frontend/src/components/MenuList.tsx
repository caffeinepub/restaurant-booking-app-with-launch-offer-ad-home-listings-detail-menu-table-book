import type { MenuItem } from '../backend';

interface MenuListProps {
  items: MenuItem[];
}

export default function MenuList({ items }: MenuListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No menu items available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index}
          className="flex justify-between items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">{item.name}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <div className="flex-shrink-0 font-semibold text-primary">
            ${(Number(item.price) / 100).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
