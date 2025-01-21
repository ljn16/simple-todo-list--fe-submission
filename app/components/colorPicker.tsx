interface ColorPickerProps {
    color: string;
    setColor: (color: string) => void;
}

export default function ColorPicker({color, setColor}: ColorPickerProps) {
    const colorOptions = [
        '#F44336', // red
        '#FF9800', // orange
        '#FFEB3B', // yellow
        '#4CAF50', // green
        '#2196F3', // blue
        '#3F51B5', // indigo
        '#9C27B0', // purple
        '#E91E63', // pink
        '#795548', // brown
    ];


    return (
        <div className="my-4">
            <h2 className="mb-2 text-blue-400 font-semibold">Color</h2>
            <div className="flex gap-2 mb-4">
                {colorOptions.map((colorOption) => {
                    const isSelected = colorOption === color;
                    return (
                        <button className={`w-10 h-10 rounded-full border-2 ${isSelected ? 'border-white' : 'border-transparent'} outline-none cursor-pointer hover:border-yellow-500`} 
                            style={{ backgroundColor: colorOption }}
                            key={colorOption}
                            onClick={() => setColor(colorOption)}
                            aria-label={`Select ${colorOption}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}

