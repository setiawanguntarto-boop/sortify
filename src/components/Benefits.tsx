import { Eye, Smartphone, Heart } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "Transparent",
    description: "All records and points are visible anytime",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "Simple",
    description: "Field officers input the data, you only check results",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Heart,
    title: "Meaningful",
    description: "Every small contribution has a big impact on the environment",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Why Choose Sortify?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Making waste management accessible, transparent, and rewarding
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.title}
                className="text-center space-y-4 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${benefit.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-10 h-10 ${benefit.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
