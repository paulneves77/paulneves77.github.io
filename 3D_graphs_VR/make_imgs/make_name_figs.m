%% information for figures
save_names = ["Barak", "Cappellaro", "Chandran", "Checkelsky", "Choi", ...
    "Chuang", "C�t�", "Demler", "Englund", "Greiner", "Han", "Hayden", ...
    "Hu", "Jarillo-Herrero", "Ketterle", "Kim", "Lukin", "Ni", ...
    "Natarajan", "Notaros", "Park", "Preskill", "Sachdev", ...
    "Schleier-Smith", "Sudan", "Sushkov", "Todadri", "Vishwanath", ...
    "Vuckovic", "Zwierlein", "PDF1", "PDF2", "PDF3", "PDF4", "PDF5"];
names = ["Barak", "Cappellaro", "Chandran", "Checkelsky", "Choi", ...
    "Chuang", "C�t�", "Demler", "Englund", "Greiner", "Han", "Hayden", ...
    "Hu", "Jarillo-Herrero", "Ketterle", "Kim", "Lukin", "Ni", ...
    "Natarajan", "Notaros", "Park", "Preskill", "Sachdev", ...
    "Schleier-Smith", "Sudan", "Sushkov", "Todadri", "Vishwanath", ...
    "Vuckovic", "Zwierlein", "PDF", "PDF", "PDF", "PDF", "PDF"];
dept = ["CS", "NE", "Ph", "Ph", "Ph", "EE", "Ph", "Ph", "EE", "Ph", ...
    "EE", "CS", "EE", "Ph", "Ph", "Ph", "Ph", "Ch", "CS", "EE", "Ch", ...
    "Ph", "Ph", "Ph", "CS", "Ph", "Ph", "Ph", "EE", "Ph", "PD", "PD", ...
    "PD", "PD", "PD"];
exp = ["QI", "QS", "MB", "MC", "QI", "QI", "MB", "MB", "PO", "QSim", ...
    "PO", "QI", "PO", "MC", "QSim", "MC", "QI", "QSim", "QI", "PO", ...
    "MC", "QI", "MB", "QSim", "QI", "QS", "MB", "MB", "PO", "QSim", ...
    "PD", "PD", "PD", "PD", "PD"];
theo_exp = ["E", "E", "T", "E", "T", "E", "T", "T", "E", "E", "E", "T", ...
    "E", "E", "E", "E", "E", "E", "T", "E", "E", "T", "T", "E", "T", ...
    "E", "T", "T", "E", "E", "T", "T", "T", "T", "T"];
txt_size = [0.3, 0.2, 0.2, 0.2, 0.4, ...
    0.25, 0.4, 0.3, 0.25, 0.25, 0.4, 0.25, ...
    0.4, 0.25, 0.25, 0.4, 0.3, 0.4, ...
    0.2, 0.25, 0.4, 0.25, 0.25, ...
    0.2, 0.3, 0.25, 0.25, 0.2, ...
    0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4];

clr_nm = ["Ph", "Ch", "EE", "CS", "NE", "QI", "QSim", "QS", "MC", "PO", ...
    "MB", "E", "T", "PD"];
clr_sp = ["#B3B1B2", "#66C298", "#629DD4", "#EAD788", "#ED8A88", ...
    "#9ADAF0", "#A6D387", "#FFC918", "#F7EB85", "#E59CC4", "#B28CC0", ...
    "#FF0000", "#0000FF", "#D5D5D5"];


%% draw a figure for each person
close all

% define semicircles
r = 0.95;
sctop = r.*[cos(0:0.01:pi); sin(0:0.01:pi)];
scbot = r.*[cos(0:0.01:pi); -sin(0:0.01:pi)];

for i = 1:numel(names)
    f = figure;
    axes('Units', 'normalized', 'Position', [0 0 1 1]);
    set(gcf, 'Position', [100 100 560 560])
    axis([-1 1 -1 1])
    
    % info for this plot
    this_file = save_names(i);
    this_name = names(i);
    this_dept = dept(i);
    this_exp = exp(i);
    this_TE = theo_exp(i);
    this_size = txt_size(i);
    
    dept_clr = clr_sp(this_dept==clr_nm);
    exp_clr = clr_sp(this_exp==clr_nm);
    TE_clr = clr_sp(this_TE==clr_nm);
    
    % draw colored semicircles
    area(sctop(1,:), sctop(2,:), 'FaceColor', dept_clr, 'lineStyle', 'none')
    hold on
    area(scbot(1,:), scbot(2,:), 'FaceColor', exp_clr, 'lineStyle', 'none')
    plot(sctop(1,:), sctop(2,:), 'Color', TE_clr, 'LineWidth', 16)
    plot(scbot(1,:), scbot(2,:), 'Color', TE_clr, 'LineWidth', 16)
    
    if contains(this_name, '-')
        hyphen_ind = strfind(this_name, '-');
        temp = char(this_name);
        annotation('textbox', 'String', temp(hyphen_ind+1:end), ...
            'FitBoxToText', 'on',...
            'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
            'Position', [0, 0.5-this_size, 1, this_size], ...
            'FontUnits', 'Normalized', 'FontSize', this_size-0.02, ...
            'FontWeight', 'bold', 'EdgeColor', 'none', ...
            'BackgroundColor', [1 1 1], 'FaceAlpha', 0.8)
        annotation('textbox', 'String', temp(1:hyphen_ind), ...
            'FitBoxToText', 'on',...
            'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
            'Position', [0, 0.5, 1, this_size], ...
            'FontUnits', 'Normalized', 'FontSize', this_size-0.02, ...
            'FontWeight', 'bold', 'EdgeColor', 'none', ...
            'BackgroundColor', [1 1 1], 'FaceAlpha', 0.8)
    else
        annotation('textbox', 'String', this_name, 'FitBoxToText', 'on',...
            'HorizontalAlignment', 'center', 'VerticalAlignment', 'middle', ...
            'Position', [0, 0.5-this_size/2, 1, this_size], ...
            'FontUnits', 'Normalized', 'FontSize', this_size-0.02, ...
            'FontWeight', 'bold', 'EdgeColor', 'none', ...
            'BackgroundColor', [1 1 1], 'FaceAlpha', 0.8)
    end
    hold off
    
    set(gca,'xtick',[])
    set(gca,'ytick',[])
    set(gcf, 'Color', 'None')
    set(gca, 'Color', 'none')
    
    export_fig(strcat('output/', this_file), '-dpng', '-transparent', '-r120');
    
    [A,map,transparency] = imread(strcat('output/', this_file, ".png"));
    transparency(1:3, :, :) = 0;
    transparency(end-2:end, :, :) = 0;
    transparency(:, 1:3, :) = 0;
    transparency(:, end-2:end, :) = 0;
    imwrite(A, strcat('output/', this_file, '.png'), 'alpha', transparency);
    
    close all
end